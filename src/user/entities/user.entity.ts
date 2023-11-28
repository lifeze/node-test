import { Column, Entity, OneToMany } from 'typeorm';
import { Content } from '../../common/entity/content';
import { RoleUserEntity } from 'src/role_user/entities/role_user.entity';
@Entity('user')
export class UserEntity extends Content {
  // @PrimaryGeneratedColumn()
  // id: number; // 主键id，值自动生成
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // create_time: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // update_tiem: Date;

  @Column({ length: 20 })
  username: string;
  @Column({ length: 20 })
  password: string;

  @Column({ length: 20, nullable: true })
  realName: string;

  @Column({ length: 255, nullable: true })
  avatar: string;
  @Column({ length: 255, nullable: true })
  desc: string;
  @Column({ length: 255, nullable: true })
  homePath: string;

  @OneToMany(() => RoleUserEntity, (RoleUserEntity) => RoleUserEntity.user, {
    eager: true,
  })
  roles: RoleUserEntity[];
}
