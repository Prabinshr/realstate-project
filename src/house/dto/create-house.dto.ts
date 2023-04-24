import { ApiProperty } from "@nestjs/swagger";
import { AreaType, Negotiable, PriceLabel, PropertyCategory, PropertyFace, PropertyType, Purpose, RoadType } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyTitle: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
  @ApiProperty()
  @IsNotEmpty()
  price: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priceLabel: PriceLabel;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  negotiable: Negotiable;

  @ApiProperty()
  @IsString()
  livingRoom?: number;
  @ApiProperty()
  @IsString()
  kitchen?: number;
  @ApiProperty()
  @IsString()
  bedroom?: number;
  @ApiProperty()
  @IsString()
  toilet?: number;
  @ApiProperty()
  @IsString()
  bathroom?: number;
  @ApiProperty()
  @IsString()
  roadAccess?: number;
  @ApiProperty()
  @IsString()
  builtYear?: number;
  @ApiProperty()
  @IsString()
  storey?: number;
  @ApiProperty()
  @IsString()
  floor?: number;
  @ApiProperty()
  @IsString()
  garage?: number;

  @ApiProperty()
  @IsString()
  propertyId?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: PropertyCategory;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  purpose: Purpose;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  areaType: AreaType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  area: string;
  @ApiProperty()
  @IsString()
  roadType?: RoadType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyType: PropertyType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyFace: PropertyFace;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  PropertyFeature: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  condition: string;
  @ApiProperty()
  @IsString()
  landmark?: string;

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
  propertyDesc?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
