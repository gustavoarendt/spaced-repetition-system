import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({ message: 'Texto da frente não pode estar vazio' })
  frontText: string;

  @IsNotEmpty({ message: 'Texto de trás não pode estar vazio' })
  backText: string;
}
