import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validations/UniqueEmail.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsOptional()
  readonly name: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  @IsOptional()
  @UniqueEmail({ message: 'Email já está em uso' })
  readonly email: string;

  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @IsOptional()
  readonly password: string;
}
