import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { DeckEntity } from 'src/modules/decks/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, DeckEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
