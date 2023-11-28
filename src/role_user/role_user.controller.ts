import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleUserService } from './role_user.service';
import { CreateRoleUserDto } from './dto/create-role_user.dto';
import { UpdateRoleUserDto } from './dto/update-role_user.dto';

@Controller('role-user')
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}

  @Post()
  create(@Body() createRoleUserDto: CreateRoleUserDto) {
    return this.roleUserService.create(createRoleUserDto);
  }

  @Get()
  findAll() {
    return this.roleUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleUserService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleUserService.remove(id);
  }
}
