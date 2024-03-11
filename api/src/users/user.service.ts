import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { ListUserDto } from './dtos/ListUsers.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async listUsers() {
    const usersList = await this.userRepository.findAll();
    return usersList.map((user) => ListUserDto.fromEntity(user));
  }
}
