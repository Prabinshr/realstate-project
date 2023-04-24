import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('House')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create house' })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all houses' })
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get house by id' })
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update house by id' })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete house by id' })
  remove(@Param('id') id: string) {
    return this.houseService.remove(id);
  }
}
