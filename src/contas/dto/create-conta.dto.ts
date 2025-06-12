import { IsDate, IsNumber, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateContaDto {
    @IsString({ message: 'descricao deve ser uma string'})
    descricao: string;
    
    @IsString({ message: 'categoria deve ser uma string'})
    categoria: string;
    
    @IsString({ message: 'forma de pagamento deve ser uma string'})
    formapgto: string;
    
    
    @IsNumber({},{ message: 'valor deve ser um número'})
    @IsPositive({ message: 'valor deve ser positivo'})
    valor: number;
}



