import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ name: 'uniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UserService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.usersRepository.findUserByEmail(value);
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
