import { HttpException, Injectable } from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { PropertyCategory, PropertyFace, RoadType } from '@prisma/client';

@Injectable()
export class LandService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {}

  create(createLandDto: CreateLandDto) {
    try {
      return this.prisma.land.create({ data: createLandDto });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
  async uploadLandImage(id: string, landImage: Express.Multer.File) {
    try {
      console.log(landImage);
      // const uploadImage = await this.prisma.land.update({where:{id},data:{image:`/land/image/${String{landImage}}`}})
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  findAll() {
    try {
      return this.prisma.land.findMany();
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
  async findLand(
    price: string,
    propertyCategory: PropertyCategory,
    roadType: RoadType,
    propertyFace: PropertyFace,
    roadAccess: string,
  ) {
    var gte: number;
    var lte: number;

    var gft: number;
    var lft: number;

    switch (price) {
      case 'lt_50l':
        gte = 0;
        lte = 5000000;
        break;
      case 'gt_50l_lt_1c':
        gte = 5000000;
        lte = 10000000;
        break;
      case 'gt_1c_lt_5c':
        gte = 10000000;
        lte = 50000000;
        break;
      case 'gt_5c_lt_10c':
        gte = 50000000;
        lte = 100000000;
        break;
      case 'gt_10c':
        gte = 100000000;
        break;
      default:
        gte = 0;
    }
    switch (roadAccess) {
      case 'lt_1ft_gt_10ft':
        gft = 1;
        lft = 10;
        break;
      case 'lt_11ft_gt_20ft':
        gft = 11;
        lft = 20;
        break;
      case 'lt_21ft_gt_30ft':
        gft = 21;
        lft = 30;
        break;

      default:
        gft = 0;
    }

    try {
      const land = await this.prisma.land.findMany({
        where: {
          price: {
            gte,
            lte,
          },
          roadAccess: {
            gte:gft,
            lte:lft,
          },
          propertyCategory,
          roadType,
          propertyFace,
        },
      });

      if (land.length === 0) throw new HttpException('Cannot find lands', 404);

      return land;
    } catch (e) {
      throw new HttpException('Cannot find lands', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.land.findUnique({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  update(id: string, updateLandDto: UpdateLandDto) {
    try {
      const updateLand = this.prisma.land.update({
        data: updateLandDto,
        where: { id },
      });

      if (updateLandDto.status === 'VERIFIED') {
        const message = `Your ${updateLandDto.propertyTitle} has been verified`;
        const userId = updateLandDto.userId;

        const notification = this.notification.create(userId, message);
        return notification;
      }
      if (updateLandDto.status === 'UNVERIFIED') {
        const message = `Your ${updateLandDto.propertyTitle} has been unverified`;
        const userId = updateLandDto.userId;

        const notification = this.notification.create(userId, message);
        return notification;
      }

      return updateLand;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.land.delete({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
