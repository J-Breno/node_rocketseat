import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

interface ParamUser {
  id: string;
  idEmpresa: string;
}

interface QueryUser {
  p: string;
  r: string;
}

interface BodyUser {
  name: string;
  age: number;
}

@Controller('/users')
export class UserController {
  @Get('/:id/:idEmpresa')
  findById(@Param() { id, idEmpresa }: ParamUser) {
    return 'Usuário do ID ' + id + ' - Empresa id: ' + idEmpresa;
  }

  @Get('/findByPages')
  findByPages(@Query() { p, r }: QueryUser) {
    return 'Query p ' + p + ' Query r ' + r;
  }

  @Post('/create')
  create(@Body() data: BodyUser) {
    return {
      ...data,
      id: randomUUID(),
    };
  }
}
