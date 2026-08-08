import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UsersController, UploadController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
