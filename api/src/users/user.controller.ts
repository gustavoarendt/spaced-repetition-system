import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserRequest.dto';
import { UserService } from './user.service';
import { ListUserDto } from './dtos/ListUsers.dto';
import { UpdateUserDto } from './dtos/UpdateUserRequest.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    return {
      usuario: ListUserDto.fromEntity(createdUser),
      mensagem: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async getUsers() {
    return await this.userService.listUsers();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, user);
    return {
      usuario: updatedUser,
      mensagem: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return {
      mensagem: 'Usuário deletado com sucesso',
    };
  }
}
