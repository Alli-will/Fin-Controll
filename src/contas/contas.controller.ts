import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Query } from '@nestjs/common';
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

  @Post()
  create(@Body() createContaDto: CreateContaDto) {

    return this.contasService.create(createContaDto);
  }

  @Get()
  findAll(
    @Headers('x-api-token') token: String,
    @Query('nome') nome?: string,
    @Query('data') data?: string,
    @Query('valor') valor?: string,
    @Query('descricao') descricao?: string,
    @Query('categoria') categoria?: string,
    @Query('formapgto') formapgto?: string,
) {
    if(!token) 
      throw new  
    UnauthorizedException('Token não Enviado');

    this.authService.validateToken(token);
    
    return this.contasService.findAll(
      data ? new Date(data) : undefined,
      valor ? parseFloat(valor) : undefined,
      descricao,
      categoria,
      formapgto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contasService.update(+id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contasService.remove(+id);
  }
}
