import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validations/UniqueEmail.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  readonly name: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  @UniqueEmail({ message: 'Email já está em uso' })
  readonly email: string;

  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  readonly password: string;
}
