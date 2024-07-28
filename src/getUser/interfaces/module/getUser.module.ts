import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getUserService } from '../../application/getUser.service';
import configuration from '../../../share/domain/resources/env.config';
import { getUserController } from '../controller/getUser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from 'src/share/domain/entities/deuda.entity';

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
  controllers: [getUserController],
  providers: [getUserService],
})
export class getUserModule {}
