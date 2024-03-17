import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from 'src/modules/decks/deck.entity';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/CreateCard.dto';
import { UpdateCardDto } from './dto/UpdateCard.dto';
import { DifficultyLevel } from './enum/difficultyLevel.enum';

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

    if (cardDto.difficultyLevel && cardDto.difficultyLevel in DifficultyLevel) {
      this.handleDifficultyLevel(cardDto.difficultyLevel, card);
    }

    await this.cardRepository.save(card);
  }

  async getAll(userId: string, deckId: string): Promise<CardEntity[]> {
    const cards = await this.cardRepository.find({
      where: { deck: { id: deckId, user: { id: userId } } },
      order: { nextReviewDate: 'ASC' },
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

  private handleDifficultyLevel(
    difficultyLevel: DifficultyLevel,
    card: CardEntity,
  ): void {
    switch (difficultyLevel) {
      case DifficultyLevel.NEW:
        if (card.difficultyLevel === DifficultyLevel.NEW) {
          card.nextReviewDate = this.addTimeInMinutes(15);
          break;
        }
        card.nextReviewDate = this.addTimeInMinutes(5);
        break;
      case DifficultyLevel.LEARNING:
        if (card.difficultyLevel === DifficultyLevel.LEARNING) {
          card.nextReviewDate = this.addTimeInDays(3);
          break;
        }
        card.nextReviewDate = this.addTimeInDays(1);
        break;
      case DifficultyLevel.MASTERED:
        if (card.difficultyLevel === DifficultyLevel.MASTERED) {
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
