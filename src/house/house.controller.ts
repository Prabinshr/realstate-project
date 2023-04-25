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
import { House, Purpose, Role, Status } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AtAuthGuard } from 'src/auth/guards';
import { User } from 'src/user/entities/user.entity';

@ApiTags('House')
@Controller('house')
@ApiBearerAuth('jwt')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Create house' })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  //get your desired houses (VERIFIED,UNVERIFIED OR PENDING)---FOR ADMIN
  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Get all houses' })
  findAll(@Query('status') status: Status) {
    return this.houseService.findAll(status);
  }

  // get all houses if you are ADMIN
  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  findMany() {
    return this.houseService.findMany();
  }

  // get houses by any user - only VERIFIED houses
  @Get('user')
  getVerifiedHouses() {
    return this.houseService.getVerifiedHouses();
  }

  // get houses created by logged-in USER as per contactNumber
  @Get('user-houses')
  @Roles(Role.ADMIN, Role.USER)
  // @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  getMyHouses(@Query('contactNumber') contactNumber: string) {
    return this.houseService.getMyHouses(contactNumber);
  }

  // get houses by Purpose(RENT/BUY)
  @Get('by-purpose')
  getHouseByPurpose(@Query('purpose') purpose: Purpose) {
    return this.houseService.getHouseByPurpose(purpose);
  }

  // // get houses created by user as per ownerName
  // @Get('user-houses')
  // // @Roles(Role.USER)
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(AtAuthGuard)
  // getHousesByContactName(@Query('ownerName') ownerName: string) {
  //   return this.houseService.getHousesByContactName(ownerName);
  // }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Get house by id' })
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update house by id' })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }

  // delete houses by ADMIN only
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Delete house by id' })
  remove(@Param('id') id: string) {
    return this.houseService.remove(id);
  }
}
