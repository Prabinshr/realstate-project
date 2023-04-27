import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { LandService } from './land.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropertyCategory, PropertyFace, RoadType } from '@prisma/client';

@ApiTags('Land')
@Controller('land')
export class LandController {
  constructor(private readonly landService: LandService) {}

  @Post()
  create(@Body() createLandDto: CreateLandDto) {
    return this.landService.create(createLandDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'land',
          maxCount: 10,
        },
      ],
      {
        storage: diskStorage({
          destination: './landImg',
          filename: (req, file, callback) => {
            console.log(file);

            const filename = file.originalname;
            const ext = extname(file.originalname);
            callback(null, `${filename}${ext}`);
          },
        }),
      },
    ),
  )
  uploadFiles(
    @UploadedFiles()
    file: {
      land?: Express.Multer.File[];
    },
  ): object {
    console.log(file);
    return {
      message: 'File Upload',
    };
  }

  @Get()
  findAll() {
    return this.landService.findAll();
  }
  @Get('filter')
  async findLand(
    @Query('price') price: string,
    @Query('propertyCategory') propertyCategory: PropertyCategory,
    @Query('roadType') roadType: RoadType,
    @Query('propertyFace') propertyFace: PropertyFace,
    @Query('roadAccess') roadAccess: string,
  ) {
    return await this.landService.findLand(
      price,
      propertyCategory,
      roadType,
      propertyFace,
      roadAccess
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto) {
    return this.landService.update(id, updateLandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landService.remove(id);
  }
}
