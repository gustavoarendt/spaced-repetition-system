import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail(undefined, { message: 'Email inválido' })
  readonly email: string;

  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  readonly password: string;
}
