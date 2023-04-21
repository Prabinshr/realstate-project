import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.email.includes(' ')) {
      throw new HttpException('Email cannot contain space', 400);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: createUserDto.email.toLowerCase() }],
      },
    });

    if (user) {
      throw new HttpException(
        'User With This Email Already Exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await argon.hash(createUserDto.password);
    createUserDto.password = hashPassword;
    createUserDto.confirmPassword = hashPassword;

    const { password, confirmPassword, ...newUser } =
      await this.prisma.user.create({
        data: { ...createUserDto, email: createUserDto.email.toLowerCase() },
      });

    return newUser;
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        houses: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        houses: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashPassword = await argon.hash(updateUserDto.password);
      updateUserDto.password = hashPassword;
    }
    try {
      const updateUser = await this.prisma.user.update({
        data: { ...updateUserDto },
        where: { id },
      });

      const { password, ...withoutPassword } = updateUser;
      return withoutPassword;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
