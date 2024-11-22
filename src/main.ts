import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengaktifkan CORS dengan mengizinkan frontend pada port 5173
  app.enableCors({
    origin: 'http://localhost:5173',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,  // Jika diperlukan untuk mengirim cookies
  });

  await app.listen(3000);
}
bootstrap();
