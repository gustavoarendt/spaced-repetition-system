import { UserEntity } from '../user.entity';

export class ListUserDto {
  id: string;
  name: string;

  static fromEntity(user: UserEntity): any {
    return {
      id: user.id,
      name: user.name,
    } as ListUserDto;
  }
}
