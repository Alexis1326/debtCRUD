import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getAllUserService } from '../../application/getAllUser.service';
import configuration from '../../../share/domain/resources/env.config';
import { getAllUserController } from '../controller/getAllUser.controller';
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
  controllers: [getAllUserController],
  providers: [getAllUserService],
})
export class getAllUserModule {}
