import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { House, Role, Status } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AtAuthGuard } from 'src/auth/guards';
import { User } from 'src/user/entities/user.entity';

@ApiTags('House')
@Controller('house')
@ApiBearerAuth('jwt')
@UseGuards(AtAuthGuard)
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create house' })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  //get your desired houses (VERIFIED,UNVERIFIED OR PENDING)---FOR ADMIN
  @Get('admin/by-status')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all houses' })
  findAll(@Query('status') status: Status) {
    return this.houseService.findAll(status);
  }

  // get all houses if you are ADMIN
  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findMany() {
    return this.houseService.findMany();
  }

  //for user
  @Get('verified')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getVerifiedHouses() {
    return this.houseService.getVerifiedHouses();
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
