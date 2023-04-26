import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
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
})
export class LandModule {}
