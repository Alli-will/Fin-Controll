import { IsDate, IsNumber, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateContaDto {
    @IsString({ message: 'descricao deve ser uma string'})
    descricao: String;
    
    @IsString({ message: 'categoria deve ser uma string'})
    categoria: String;
    
    @IsString({ message: 'forma de pagamento deve ser uma string'})
    formapgto: String;
    
    
    @IsNumber({},{ message: 'valor deve ser um número'})
    @IsPositive({ message: 'valor deve ser positivo'})
    valor: number;
}



