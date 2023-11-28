import { Column, Entity } from 'typeorm';

import { Content } from '../../common/entity/content';

@Entity('role')
export class RoleEntity extends Content {
  @Column({ length: 255 })
  roleName: string;

  @Column({ length: 60, unique: true })
  value: string;
}
