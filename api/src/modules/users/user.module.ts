import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validations/UniqueEmail.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator],
  exports: [UserService],
})
export class UserModule {}
