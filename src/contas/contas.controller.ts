import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Query, BadRequestException } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private readonly authService: AuthService
  ) {}

  private validateToken(token: string): void {
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    this.authService.validateToken(token);
  }

  @Post()
  create(
    @Body() createContaDto: CreateContaDto,
    @Headers('x-api-token') token: string
  ) {
    this.validateToken(token);
    return this.contasService.create(createContaDto);
  }

  @Get()
  findAll(
    @Headers('x-api-token') token: string,
    @Query('id') id?: string,
    @Query('data') data?: string,
    @Query('valor') valor?: string,
    @Query('descricao') descricao?: string,
    @Query('categoria') categoria?: string,
    @Query('formapgto') formapgto?: string,
  ) {
    this.validateToken(token);
    
    
    if (id && !/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }
    
    if (valor && isNaN(parseFloat(valor))) {
      throw new BadRequestException('Valor deve ser um número válido');
    }

    if (data && isNaN(new Date(data).getTime())) {
      throw new BadRequestException('Data inválida. Use o formato YYYY-MM-DD');
    }

    return this.contasService.findAll(
      id,
      data,
      valor,
      descricao,
      categoria,
      formapgto
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('x-api-token') token: string
  ) {
    this.validateToken(token);

    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    return this.contasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
    @Headers('x-api-token') token: string
  ) {
    this.validateToken(token);

    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    return this.contasService.update(id, updateContaDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('x-api-token') token: string
  ) {
    this.validateToken(token);

    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    return this.contasService.remove(id);
  }
}