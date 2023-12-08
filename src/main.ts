import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用过滤
  // 异常过滤
  app.useGlobalFilters(new HttpExceptionFilter());
  // 成功过滤
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content-Range',
    credentials: true,
    maxAge: 3600,
  });
  app.setGlobalPrefix('myNode');
  await app.listen(3000);
}
bootstrap();
