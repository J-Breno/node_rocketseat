import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import type { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserService) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
