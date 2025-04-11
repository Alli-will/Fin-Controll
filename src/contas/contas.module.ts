import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ContasController],
  providers: [
    ContasService, 
    PrismaService, 
    AuthService],
})
export class ContasModule {}
