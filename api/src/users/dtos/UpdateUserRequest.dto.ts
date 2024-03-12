import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUserRequest.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
