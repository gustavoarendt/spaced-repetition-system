import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from 'src/modules/decks/deck.entity';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { DificultyLevel } from './enum/dificultyLevel.enum';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
  ) {}

  async create(
    userId: string,
    deckId: string,
    cardDto: CreateCardDto,
  ): Promise<void> {
    const deckFound = await this.deckRepository.findOneBy({
      id: deckId,
      user: { id: userId },
    });
    if (!deckFound) {
      throw new NotFoundException('Deck não encontrado');
    }
    const card = new CardEntity();
    card.frontText = cardDto.frontText;
    card.backText = cardDto.backText;
    card.deck = deckFound;
    await this.cardRepository.save(card);
  }

  async delete(userId: string, cardId: string): Promise<void> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, deck: { user: { id: userId } } },
    });
    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }
    await this.cardRepository.softDelete({ id: cardId });
  }

  async update(
    userId: string,
    cardId: string,
    cardDto: UpdateCardDto,
  ): Promise<void> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, deck: { user: { id: userId } } },
    });
    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }
    card.frontText = cardDto.frontText;
    card.backText = cardDto.backText;

    if (cardDto.dificultyLevel && cardDto.dificultyLevel in DificultyLevel) {
      this.handleDificultyLevel(cardDto.dificultyLevel, card);
    }

    await this.cardRepository.save(card);
  }

  async getAll(userId: string, deckId: string): Promise<CardEntity[]> {
    const cards = await this.cardRepository.find({
      where: { deck: { id: deckId, user: { id: userId } } },
    });
    return cards;
  }

  async getPriorizedCards(
    userId: string,
    deckId: string,
  ): Promise<CardEntity[]> {
    const cards = await this.cardRepository.find({
      where: { deck: { id: deckId, user: { id: userId } } },
      order: { nextReviewDate: 'ASC' },
      take: 10,
    });
    return cards;
  }

  private handleDificultyLevel(
    dificultyLevel: DificultyLevel,
    card: CardEntity,
  ): void {
    switch (dificultyLevel) {
      case DificultyLevel.NEW:
        if (card.dificultyLevel === DificultyLevel.NEW) {
          card.nextReviewDate = this.addTimeInMinutes(15);
          break;
        }
        card.nextReviewDate = this.addTimeInMinutes(5);
        break;
      case DificultyLevel.LEARNING:
        if (card.dificultyLevel === DificultyLevel.LEARNING) {
          card.nextReviewDate = this.addTimeInDays(3);
          break;
        }
        card.nextReviewDate = this.addTimeInDays(1);
        break;
      case DificultyLevel.MASTERED:
        if (card.dificultyLevel === DificultyLevel.MASTERED) {
          card.nextReviewDate = this.addTimeInDays(14);
          break;
        }
        card.nextReviewDate = this.addTimeInDays(7);
        break;
      default:
        break;
    }
  }

  private addTimeInMinutes(minutes: number): string {
    return new Date(Date.now() + minutes * 60 * 1000).toISOString();
  }

  private addTimeInDays(days: number): string {
    return new Date(Date.now() + days * 60 * 60 * 1000).toISOString();
  }
}
