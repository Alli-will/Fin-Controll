import { IsDate, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateContaDto {
    @IsString()
    descricao: String;
    
    @IsString()
    categoria: String;
    
    @IsString()
    formapgto: String;
    
    @IsDate()
    data: Date;
    
    @IsNumber()
    @IsPositive()
    valor: number;
}

