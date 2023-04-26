import { HttpException, HttpStatus, Module, forwardRef } from '@nestjs/common';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [LandController],
  providers: [LandService],
  exports:[LandService]
})
export class LandModule {}
