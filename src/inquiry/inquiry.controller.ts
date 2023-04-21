import { Post, Body, Get, Param } from '@nestjs/common/decorators';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryForm } from './dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private inquiryService: InquiryService) {}

  @Post()
  async sendInquiryForm(@Body() inquiryForm: InquiryForm): Promise<Object> {
    return await this.inquiryService.sendInquiryForm(inquiryForm);
  }

  @Get()
  getAll() {
    return this.inquiryService.getAll();
  }

  // @Get(':time')
  // getByTime(@Param('time', ParseIntPipe) time: number) {
  //   return this.inquiryService.getByTime(time);
  // }
}
