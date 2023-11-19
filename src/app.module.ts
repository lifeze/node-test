import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

// 从环境变量中读取数据库配置
const { MYSQL_PASSWORD, MYSQL_ADDRESS = '' } = process.env;
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
      database: 'nodejs_demo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
