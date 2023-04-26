import { ApiProperty } from '@nestjs/swagger';
import {
  AreaType,
  Negotiable,
  PriceLabel,
  PropertyCategory,
  PropertyFace,
  Purpose,
  RoadType,
  Status,
} from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLandDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  propertyId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  purpose: Purpose;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyCategory: PropertyCategory;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyFace: PropertyFace;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  landmark: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roadType?: RoadType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roadAccess?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  areaType: AreaType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priceLabel: PriceLabel;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  negotiable: Negotiable;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyTitle: string;

  
  @ApiProperty()
  @IsOptional()
  @IsString()
  propertyDescription?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: Status;
}
