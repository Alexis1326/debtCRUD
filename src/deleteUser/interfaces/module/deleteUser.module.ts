import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../share/domain/resources/env.config';
import { deleteUserController } from '../controller/deleteUser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from 'src/share/domain/entities/deuda.entity';
import { deleteUserService } from 'src/deleteUser/application/deleteUser.service';

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
  controllers: [deleteUserController],
  providers: [deleteUserService],
})
export class deleteUserModule {}
