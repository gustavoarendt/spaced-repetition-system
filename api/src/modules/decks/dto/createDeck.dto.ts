import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateDeckDto {
  @IsNotEmpty()
  name: string;

  @Exclude()
  userId: string;
}
