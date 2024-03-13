import { Exclude } from 'class-transformer';

export class ListDecksDto {
  id: string;
  name: string;

  @Exclude()
  deletedAt: string;
}
