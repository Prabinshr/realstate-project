import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma:PrismaService){}

  async create(userId: string, message: string) {
    try{
      return this.prisma.notification.create({
        data: {
          userId,
          message,
        },
      })
        
    }catch(err){
      throw new HttpException(err,500)
    }
  }

  findAll() {
    try{
      return this.prisma.notification.findMany()

    }catch(err){
      throw new HttpException(err,500)
    }
  }

  findOne(id: string) {
    try{
      return this.prisma.notification.findUnique({where:{id}})

    }catch(err){
      throw new HttpException(err,500)
    }
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    try{
      return this.prisma.notification.update({data:updateNotificationDto,where:{id}})

    }catch(err){
      throw new HttpException(err,500)
    }
  }

  remove(id: string) {
    try{
      return this.prisma.notification.delete({where:{id}})

    }catch(err){
      throw new HttpException(err,500)
    }
  }
}
