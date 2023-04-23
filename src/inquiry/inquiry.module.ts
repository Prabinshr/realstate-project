import { Module } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [InquiryService],
  controllers: [InquiryController],
  exports: [InquiryService],
})
export class InquiryModule {}
