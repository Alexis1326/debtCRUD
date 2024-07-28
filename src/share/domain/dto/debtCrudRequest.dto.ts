import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

class DebtDetail {
  @ApiProperty({ description: 'fecha en la que se adquirió la deuda' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  payday: Date;

  @ApiProperty({ description: 'valor de la deuda' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class DebtCrudRequest {

  @ApiProperty({ description: 'nombre de la persona con la que se adquirió la deuda' })
  @IsNotEmpty()
  @IsString()
  namePerson: string;

  @ApiProperty({ description: 'detalles de las deudas (fecha y precio)', type: [DebtDetail] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DebtDetail)
  debts: DebtDetail[];
}
