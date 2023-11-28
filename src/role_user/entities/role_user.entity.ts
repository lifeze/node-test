import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Content } from '../../common/entity/content';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Entity('role_user')
export class RoleUserEntity extends Content {
  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.roles)
  user: UserEntity;

  @OneToOne(() => RoleEntity, (RoleEntity) => RoleEntity, { eager: true })
  @JoinColumn()
  role: RoleEntity;

  @Column({ default: true })
  enable: boolean;
}
