import { PrismaService } from 'src/infra/database/prisma.service';

export type CreateUserDTO = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export class CreateUserService {
  constructor(private prisma: PrismaService) {}
  async execute(data: CreateUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (user) {
      throw new Error('User already exists!');
    }

    return await this.prisma.user.create({
      data,
    });
  }
}
