import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, user: Partial<Omit<UserEntity, 'id|email'>>) {
    this.users = this.users.map((u) => {
      if (u.id === id) {
        return { ...u, ...user };
      }
      return u;
    });
  }

  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
