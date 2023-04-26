import { HttpException, Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { House, Purpose, Role, Status, User } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class HouseService {
  constructor(private prismaService: PrismaService,private notification:NotificationService) {}
  create(createHouseDto: CreateHouseDto) {
    try {
      return this.prismaService.house.create({ data: createHouseDto });
    } catch (err) {
      throw new HttpException('Cannot create house.', 500);
    }
  }

  //for ADMIN
  findAll(status: Status) {
    return this.prismaService.house.findMany({
      where: { status },
    });
  }

  // FOR ADMIN
  findMany() {
    return this.prismaService.house.findMany();
  }

  // for USER
  getVerifiedHouses() {
    return this.prismaService.house.findMany({
      where: { status: 'VERIFIED' },
    });
  }

  getMyHouses(contactNumber: string) {
    return this.prismaService.house.findMany({
      where: { contactNumber: contactNumber },
    });
  }

  getHouseByPurpose(purpose: Purpose) {
    return this.prismaService.house.findMany({
      where: { purpose: purpose },
    });
  }

  findOne(id: string) {
    try {
      return this.prismaService.house.findUnique({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot find one house by id.', 500);
    }
  }

  update(id: string, updateHouseDto: UpdateHouseDto) {
    try {
      const updateHouse=  this.prismaService.house.update({
        data: updateHouseDto,
        where: { id: id },
      });
      if (updateHouseDto.status === 'VERIFIED') {
        const message = `Your ${updateHouseDto.propertyTitle} has been verified`;
        const userId = updateHouseDto.userId;

        const notification = this.notification.create(userId, message);
        return notification;
      }
      if (updateHouseDto.status === 'UNVERIFIED') {
        const message = `Your ${updateHouseDto.propertyTitle} has been unverified`;
        const userId = updateHouseDto.userId;

        const notification = this.notification.create(userId, message);
        return notification;
      }
      return updateHouse
    } catch (err) {
      throw new HttpException('Cannot update house by id.', 500);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.house.delete({ where: { id: id } });
    } catch (err) {
      throw new HttpException('Cannot delete a house by id.', 500);
    }
  }
}
