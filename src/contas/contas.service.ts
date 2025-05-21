import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Conta } from './entities/conta.entity';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  async create(createContaDto: CreateContaDto): Promise<Conta> {
    const conta = await this.prisma.contas.create({
      data: createContaDto,
    });
    return this.mapToEntity(conta);
  }

  async findAll(
    id?: string,
    data?: string,
    valor?: string,
    descricao?: string,
    categoria?: string,
    formapgto?: string,
  ): Promise<Conta[]> {
    const where: any = {};

    if (id) {
      if (!/^\d+$/.test(id)) {
        throw new BadRequestException('ID deve ser um número inteiro válido');
      }
      where.id = parseInt(id);
    }

    if (data) {
      const date = new Date(data);
      if (isNaN(date.getTime())) {
        throw new BadRequestException(
          'Data inválida. Use o formato YYYY-MM-DD',
        );
      }
      where.data = date;
    }

    if (valor) {
      const valorNumber = parseFloat(valor);
      if (isNaN(valorNumber)) {
        throw new BadRequestException('Valor deve ser um número válido');
      }
      where.valor = valorNumber;
    }

    if (descricao) {
      where.descricao = {
        contains: descricao,
        mode: 'insensitive',
      };
    }

    if (categoria) {
      where.categoria = {
        contains: categoria,
        mode: 'insensitive',
      };
    }

    if (formapgto) {
      where.formapgto = formapgto;
    }

    const contas = await this.prisma.contas.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return contas.map((conta) => this.mapToEntity(conta));
  }

  private mapToEntity(conta: any): Conta {
    return {
      id: conta.id,
      descricao: conta.descricao,
      categoria: conta.categoria,
      formapgto: conta.formapgto,
      data: conta.data,
      valor: conta.valor,
    };
  }

  async findOne(id: string): Promise<Conta> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    const conta = await this.prisma.contas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    return this.mapToEntity(conta);
  }

  async update(id: string, updateContaDto: UpdateContaDto): Promise<Conta> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    const contaExistente = await this.prisma.contas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contaExistente) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    const conta = await this.prisma.contas.update({
      where: { id: parseInt(id) },
      data: updateContaDto,
    });

    return this.mapToEntity(conta);
  }

  async remove(id: string): Promise<Conta> {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('ID deve ser um número inteiro válido');
    }

    const contaExistente = await this.prisma.contas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contaExistente) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    const conta = await this.prisma.contas.delete({
      where: { id: parseInt(id) },
    });

    return this.mapToEntity(conta);
  }
}
