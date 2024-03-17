import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './CreateCard.dto';
import { IsOptional } from 'class-validator';
import { DifficultyLevel } from '../enum/difficultyLevel.enum';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  difficultyLevel: DifficultyLevel;
}
