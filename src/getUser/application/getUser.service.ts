import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { Model } from 'mongoose';
import { Debt } from '../../share/domain/entities/deuda.entity';
import { InjectModel } from '@nestjs/mongoose';

/**
 * @description Clase servicio responsable de recibir el parámetro y realizar la lógica de negocio.
 */
@Injectable()
export class getUserService {
  private readonly logger = new Logger(getUserService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,

    @InjectModel(Debt.name)
    private readonly DebtModel: Model<Debt>
  ) { }

  public async getUser(namePerson: string): Promise<ApiResponseDto> {
    try {
      namePerson = namePerson.toLowerCase();
      const searchInfo = await this.DebtModel.find({ namePerson }).exec();
      if(searchInfo.length === 0){
        return new ApiResponseDto(404, 'name not found in database', []);
      }
      this.logger.log('Debt get successfully');
      return new ApiResponseDto(200, 'Debt get successfully', searchInfo);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return new ApiResponseDto(500, 'Internal Server Errorrr', null);
    }
  }
}
