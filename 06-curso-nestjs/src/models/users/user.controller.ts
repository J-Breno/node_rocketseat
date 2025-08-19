import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import type { CreateUserDTO } from './dto/user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
