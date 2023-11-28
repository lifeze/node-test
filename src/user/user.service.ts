import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.find({ where: { id } });
  }

  async findOneByName(name: string): Promise<UserEntity> {
    const temp = await this.userRepository.find({
      where: { username: name },
      // relations: ['roles'],
    });
    if (temp && temp instanceof Array && temp.length >= 1) {
      return temp[0];
    }
    return new UserEntity();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const qb = this.userRepository.createQueryBuilder();
    return await qb.update().set(updateUserDto).where({ id }).execute();
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const qb = this.userRepository.createQueryBuilder();
    if (updateUserDto?.id) {
      return await qb
        .update()
        .set({
          username: updateUserDto?.username,
        })
        .where({ id: updateUserDto?.id })
        .execute();
    } else {
      throw new HttpException('id no null', 1007);
      // return {
      //   code: 1007,
      //   message: 'id no null',
      // };
    }
  }

  async remove(id: string) {
    const qb = this.userRepository.createQueryBuilder();
    return await qb.delete().where({ id }).execute();
  }
}
