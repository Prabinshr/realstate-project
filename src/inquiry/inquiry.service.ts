import { Injectable } from '@nestjs/common';
import { InquiryForm } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { sendInquiryForm } from './email/inquiry';

@Injectable()
export class InquiryService {
  constructor(
    private mailerService: MailerService,
    private prismaService: PrismaService,
  ) {}

  async sendInquiryForm(inquiryFormDto: InquiryForm): Promise<Object> {
    const { name, phone, subject, email, message } = inquiryFormDto;

    // Saving Inquiry Details In Database
    await this.prismaService.inquiry.create({ data: inquiryFormDto });

    // Sending Inquiry Details To Admin Email
    try {
      await this.mailerService.sendMail({
        to: 'admin@email.com',
        from: email,
        subject,
        html: `${sendInquiryForm(name, phone, subject, message)}`,
      });

      return {
        success: true,
        message: 'Inquiry Form Has Been Sent To Admin !!!',
      };
    } catch (e) {
      return {
        success: false,
        message: 'Something Went Wrong Sending Email',
      };
    }
  }

  getAll() {
    return this.prismaService.inquiry.findMany();
  }

  // getByTime(time: number) {
  //   const gte = new Date(Date.now());
  //   const lte = new Date(Date.now());

  //   return this.prismaService.inquiry.findMany({
  //     where: {
  //       receivedAt: {
  //         gte,
  //         lte,
  //       },
  //     },
  //   });
  // }
}
