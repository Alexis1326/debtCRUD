import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsNumber, IsNotEmpty, ArrayMinSize, ValidateNested, IsArray } from 'class-validator';

class UserDebtDto {
    @ApiProperty({ description: 'fecha en la que se adquirió la deuda' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    payday?: Date;

    @ApiProperty({ description: 'valor de la deuda' })
    @IsNotEmpty()
    @IsNumber()
    price?: number;
}

export class UpdateDto {

    @ApiProperty({ description: 'nombre de la persona con la que se adquirió la deuda' })
    @IsNotEmpty()
    @IsString()
    namePerson?: string;

    @ApiProperty({ description: 'detalles de las deudas (fecha y precio)', type: [UserDebtDto] })
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => UserDebtDto)
    debts?: UserDebtDto[];
}
