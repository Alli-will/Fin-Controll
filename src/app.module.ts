import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContasModule } from './contas/contas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContasModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
