import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserRequest.dto';
import { v4 as uuid } from 'uuid';
import { ListUserDto } from './dtos/ListUsers.dto';
import { UpdateUserDto } from './dtos/UpdateUserRequest.dto';
import { NotFoundException } from '@nestjs/common';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    Object.assign(userEntity, createUserDto as UserEntity);
    return await this.userRepository.save(userEntity);
  }

  async listUsers(): Promise<ListUserDto[]> {
    const savedUsers = await this.userRepository.find();
    return savedUsers.map((user) => ListUserDto.fromEntity(user));
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      withDeleted: false,
    });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<void> {
    const savedUser = await this.userRepository.findOneByOrFail({ id });
    if (savedUser === null) {
      throw new NotFoundException('User not found');
    }
    Object.assign(savedUser, user as UserEntity);
    await this.userRepository.update(id, savedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
