import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/CreateUserRequest.dto';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UserController {
  constructor(private usersRepository: UserRepository) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const userEntity = user.create(uuid());
    this.usersRepository.save(userEntity);
    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
    };
  }

  @Get()
  async getUsers() {
    return this.usersRepository.getAll();
  }
}
