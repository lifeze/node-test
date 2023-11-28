import { Module } from '@nestjs/common';
import { RoleUserService } from './role_user.service';
import { RoleUserController } from './role_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUserEntity } from './entities/role_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUserEntity])],
  controllers: [RoleUserController],
  providers: [RoleUserService],
})
export class RoleUserModule {}
