import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host:  configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_port'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        username: configService.get<string>('MYSQL_USER'),
        entities: [],
        database: process.env.MYSQL_DATABASE,
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
