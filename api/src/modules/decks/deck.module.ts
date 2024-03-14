import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeckEntity, UserEntity])],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
