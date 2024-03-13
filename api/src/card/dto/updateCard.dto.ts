import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './createCard.dto';
import { IsOptional } from 'class-validator';
import { DificultyLevel } from '../enum/dificultyLevel.enum';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  dificultyLevel: DificultyLevel;
}
