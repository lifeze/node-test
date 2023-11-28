import { Injectable } from '@nestjs/common';
import { CreateRoleUserDto } from './dto/create-role_user.dto';
import { UpdateRoleUserDto } from './dto/update-role_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUserEntity } from './entities/role_user.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Injectable()
export class RoleUserService {
  constructor(
    @InjectRepository(RoleUserEntity)
    private roleUserRepository: Repository<RoleUserEntity>,
  ) {}

  async create(createRoleUserDto: CreateRoleUserDto) {
    const user = new UserEntity();
    user.id = createRoleUserDto.userId;
    const role = new RoleEntity();
    role.id = createRoleUserDto.roleId;
    const run = new RoleUserEntity();
    run.user = user;
    run.role = role;
    return await this.roleUserRepository.save(run);
  }

  findAll() {
    return `This action returns all roleUser`;
  }

  findOne(id: string) {
    return `This action returns a #${id} roleUser`;
  }

  remove(id: string) {
    return `This action removes a #${id} roleUser`;
  }
}
