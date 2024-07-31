import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Celula Azure
 *
 */
export class DebtCrudRequest {

  @ApiProperty({ description: 'nombre de la persona con la que se adquirio la deuda' })
  @IsNotEmpty()
  @IsString()
  namePerson: string;

  @ApiProperty({ description: 'fecha en la que se adquirio la deuda' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  payday: Date;
  
  @ApiProperty({ description: 'valor de la deuda' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
