import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/domain/resources/env.config';
import { GlobalModule } from './share/domain/config/global.module';
import { MongooseModule } from '@nestjs/mongoose';
import { postInfoModule } from './postInfo/interfaces/module/postInfo.module';
import { getAllUserModule } from './getAllUser/interfaces/module/getAllUser.module';
import { getUserModule } from './getUser/interfaces/module/getUser.module';
import { updateUserModule } from './updateUser/interfaces/module/updateUser.module';
import { deleteUserModule } from './deleteUser/interfaces/module/deleteUser.module';

/**
 *  @description clase anotada con un decorador @Module(). El decorador @Module() proporciona
 *  metadatos que Nest utiliza para organizar la estructura de la aplicación.
 *
 *  @author Fabrica Digital
 *
 */
@Module({
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    postInfoModule,
    getAllUserModule,
    getUserModule,
    updateUserModule,
    deleteUserModule,
    GlobalModule,
    MongooseModule.forRoot('mongodb://localhost:27017/crud-deudas'),
  ],
})
export class AppModule {}
