import { IsString, MaxLength, MinLength, IsNotEmpty, IsDateString, Matches } from 'class-validator';

export class EntidadeSchema {
    @IsNotEmpty({ message: 'A razão socialnão deve estar vazio' })
    @IsString({ message: 'A razão socialdeve ser uma string' })
    @MaxLength(255, { message: 'A razão socialnão deve exceder 255 caracteres' })
    corporate_reason: string;

    @IsNotEmpty({ message: 'O nome fantasia não deve estar vazio' })
    @IsString({ message: 'O nome fantasia deve ser uma string' })
    @MaxLength(255, { message: 'O nome fantasia não deve exceder 255 caracteres' })
    fantasy_name: string;

    @IsNotEmpty({ message: 'O CNPJ não deve estar vazio' })
    @MinLength(14, { message: 'O CNPJ deve ter pelo menos 14 caracteres' })
    @MaxLength(14, { message: 'O CNPJ não deve exceder 14 caracteres' })
    cnpj: string;

    @IsNotEmpty({ message: 'A regional não deve estar vazia' })
    @IsString({ message: 'A regional deve ser uma string' })
    regionalId: string;

    @IsNotEmpty({ message: 'As especialidades não devem estar vazias' })
    @IsString({ message: 'As especialidades devem ser uma string' })
    specialties: string;

    @IsNotEmpty({ message: 'A data de abertura não deve estar vazia' })
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'A data de abertura deve ser uma data válida no formato "yyyy-MM-dd HH:mm:ss"' })
    opening_date: string;

    active: boolean;
}