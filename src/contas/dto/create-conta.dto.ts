import { IsString } from "class-validator";

export class CreateContaDto {
    descricao: String;
    categoria: String;
    formapgto: String;
    data: Date;
    valor: number;
}

