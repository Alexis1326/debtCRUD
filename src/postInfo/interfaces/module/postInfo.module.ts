import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { debtCrudService } from '../../application/postInfo.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from 'src/postInfo/entities/deuda.entity';
import { NewContractController as postInfoController } from '../controller/postInfo.controller';

/**
 *  @description clase anotada con un decorador @Module(). El decorador @Module() proporciona
 *  metadatos que Nest utiliza para organizar la estructura de la aplicación.
 *
 *  @author Fabrica Digital
 *
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      {
        name: Debt.name,
        schema: DebtSchema,
      },
    ]),
  ],
  controllers: [postInfoController],
  providers: [debtCrudService],
})
export class postInfoModule {}
