import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'uniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.usersRepository.getByEmail(value);
    return !user;
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      propertyName: propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
