import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeckEntity } from './deck.entity';
import { CreateDeckDto } from './dto/createDeck.dto';
import { UserEntity } from '../users/user.entity';
import { v4 as uuid } from 'uuid';
import { ListDecksDto } from './dto/listDecks.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createDeck(deck: CreateDeckDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: deck.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deckEntity = new DeckEntity();
    deckEntity.id = uuid();
    deckEntity.name = deck.name;
    deckEntity.user = user;
    await this.deckRepository.save(deckEntity);
  }

  async listDecks(userId: string): Promise<ListDecksDto[]> {
    const userDecks = await this.deckRepository.find({
      where: { user: { id: userId } },
    });
    if (!userDecks) {
      throw new NotFoundException('Decks not found');
    }
    return userDecks.map((deck) => {
      const decksDto = new ListDecksDto();
      Object.assign(decksDto, deck);
      return decksDto;
    });
  }

  async deleteDeck(id: string, userId: string): Promise<void> {
    const deck = await this.deckRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    await this.deckRepository.softDelete({ id });
  }

  async getDeckById(id: string, userId: string): Promise<DeckEntity> {
    const deck = await this.deckRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }
}
