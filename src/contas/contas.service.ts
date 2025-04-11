import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Conta } from './entities/conta.entity';

@Injectable()
export class ContasService {
constructor(private prisma: PrismaService) {}


  async create(createContaDto: CreateContaDto

  ) : Promise<Conta>
  {
    const contas = await this.prisma.contas.create({
      data: createContaDto
    })
    return this.mapToEntity(contas)
  }


  async findAll(
    data?: Date,
    valor?: number,
    descricao?: string,
    categoria?: string,
    formapgto?: string
  ): Promise <Conta[]> {
    const contas = await this.prisma.contas.findMany({
      where:{
        ...(descricao && {
          descricao: {
            contains: descricao,
            mode: 'insensitive'
          },
        }),
        ...(categoria && {
          categoria: {
            contains: categoria,
            mode: 'insensitive'
          },
        }),
        ...(formapgto && {
          formapgto: {
            contains: formapgto,
            mode: 'insensitive'
          },
        }),
        ...(data && {
          data: {
            gte: data
          },
        }),
        ...(valor && {
          valor: {
            gte: valor
          },
        })

      },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    });
    return contas.map(contas => this.mapToEntity(contas));
  }

  private mapToEntity(contas: any): Conta {
    return {
      id: contas.id,
      descricao: contas.descricao,
      categoria: contas.categoria,
      formapgto: contas.formapgto,
      data: contas.data,
      valor: contas.valor

    }
  }

  async findOne(id: number): Promise<Conta | null> {
    const contas = 
      await this.prisma.contas.findUnique({ where: {id}});
    return contas ? this.mapToEntity(contas) : null;
  }

  async update(
    id: number,
    updateContaDto: 
    UpdateContaDto): Promise<Conta> {
    const conta = await
      this.prisma.contas.update({ 
        where:{ id },
        data: updateContaDto
      })
      return this.mapToEntity(conta);
  }

  async remove(id: number): Promise<Conta> {
    const contas = await this.prisma.contas.delete({
      where: {id}
    })
    return this.mapToEntity(contas);
  }
}
