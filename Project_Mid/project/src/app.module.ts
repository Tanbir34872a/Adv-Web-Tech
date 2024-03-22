import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1234567890',
      username: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'HMS',
      synchronize: true,
      //logging: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
