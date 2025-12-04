import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 💡 [핵심] CORS 설정: Vite 개발 서버 (http://localhost:5173)의 요청을 허용합니다.
  app.enableCors({
    origin: 'https://data-button-480205-c9.web.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 서버 포트는 3000번을 사용합니다.
  // await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();