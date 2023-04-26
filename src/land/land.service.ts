import { HttpException, Injectable } from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LandService {
  constructor(private prisma: PrismaService) {}

  create(createLandDto: CreateLandDto) {
    try {
      return this.prisma.land.create({ data: createLandDto });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
  async uploadLandImage(id:string,landImage:Express.Multer.File){
    try{
      console.log(landImage)
      // const uploadImage = await this.prisma.land.update({where:{id},data:{image:`/land/image/${String{landImage}}`}})
    }catch(err){
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

  findOne(id: string) {
    try {
      return this.prisma.land.findUnique({ where: { id } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  update(id: string, updateLandDto: UpdateLandDto) {
    try {
      return this.prisma.land.update({ data: updateLandDto, where: { id } });
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
