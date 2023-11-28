import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { RoleUserModule } from './role_user/role_user.module';

// 从环境变量中读取数据库配置
const { MYSQL_PASSWORD, MYSQL_ADDRESS = '', MYSQL_TABLE } = process.env;

// const MYSQL_PASSWORD = 'root';
// const MYSQL_ADDRESS = 'localhost:3306';
// const MYSQL_TABLE = 'node-demo';

const [host, port] = MYSQL_ADDRESS.split(':');

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: host,
      port: parseInt(port),
      username: 'root',
      password: MYSQL_PASSWORD,
      database: MYSQL_TABLE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    RolesModule,
    RoleUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
