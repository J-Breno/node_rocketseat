import { Controller, Get, Param } from '@nestjs/common';

interface ParamUser {
  id: string;
}

@Controller()
export class UserController {
  @Get('/users/:id')
  findById(@Param() { id }: ParamUser) {
    return 'Usuário do ID ' + id;
  }
}
