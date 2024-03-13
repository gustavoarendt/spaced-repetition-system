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
      card.dificultyLevel = cardDto.dificultyLevel;
    }
    await this.cardRepository.save(card);
  }

  async getAll(userId: string, deckId: string): Promise<CardEntity[]> {
    const cards = await this.cardRepository.find({
      where: { deck: { id: deckId, user: { id: userId } } },
    });
    return cards;
  }
}
