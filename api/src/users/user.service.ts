import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserRequest.dto';
import { v4 as uuid } from 'uuid';
import { ListUserDto } from './dtos/ListUsers.dto';
import { UpdateUserDto } from './dtos/UpdateUserRequest.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = createUserDto.password;
    return await this.userRepository.save(userEntity);
  }

  async listUsers(): Promise<void[]> {
    const savedUsers = await this.userRepository.find();
    return savedUsers.map((user) => {
      ListUserDto.fromEntity(user);
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
