import { Module } from '@nestjs/common';
import { DeckService } from './Deck.service';
import { DeckController } from './Deck.controller';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeckEntity, UserEntity])],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
