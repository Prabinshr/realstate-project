import { HttpException, Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HouseService {
  constructor(private prismaService: PrismaService) {}
  create(createHouseDto: CreateHouseDto) {
    try {
      return this.prismaService.house.create({ data: createHouseDto });
    } catch (err) {
      throw new HttpException('Cannot create house.', 404);
    }
  }

  findAll() {
    try {
      return this.prismaService.house.findMany();
    } catch (err) {
      throw new HttpException('Cannot find all houses.', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.house.findUnique({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot find one house by id.', 404);
    }
  }

  update(id: string, updateHouseDto: UpdateHouseDto) {
    try {
      return this.prismaService.house.update({
        data: updateHouseDto,
        where: { id: id },
      });
    } catch (err) {
      throw new HttpException('Cannot update house by id.', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.house.delete({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot delete a house by id.', 404);
    }
  }
}
