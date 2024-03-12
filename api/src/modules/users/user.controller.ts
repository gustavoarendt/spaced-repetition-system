import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserRequest.dto';
import { UserService } from './user.service';
import { ListUserDto } from './dtos/ListUsers.dto';
import { UpdateUserDto } from './dtos/UpdateUserRequest.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PasswordHashPipe } from 'src/resources/pipes/PasswordHashPipe';
import { AuthGuard } from '../auth/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() user: CreateUserDto,
    @Body('password', PasswordHashPipe) hashedPassword: string,
  ) {
    console.log(user);
    const createdUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });
    return {
      usuario: ListUserDto.fromEntity(createdUser),
      mensagem: 'Usuário criado com sucesso',
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthGuard)
  async getUsers() {
    return await this.userService.listUsers();
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Body('password', PasswordHashPipe) hashedPassword: string,
  ) {
    const updatedUser = await this.userService.updateUser(id, {
      ...user,
      password: hashedPassword,
    });
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
