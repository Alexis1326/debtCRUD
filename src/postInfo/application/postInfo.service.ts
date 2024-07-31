import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  OK,
  OUTCODRES,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { Model } from 'mongoose';
import { Debt } from '../entities/deuda.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DebtCrudRequest } from 'src/share/domain/dto/debtCrudRequest.dto';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class debtCrudService {
  private readonly logger = new Logger(debtCrudService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,

    @InjectModel(Debt.name)
    private readonly DebtModel: Model<Debt>
  ) { }

  public async createDebt(newDebtRequest: DebtCrudRequest): Promise<ApiResponseDto> {
    try {
      newDebtRequest.namePerson = newDebtRequest.namePerson.toLowerCase().trim();
      const existingDebt = await this.DebtModel.findOne({ namePerson: newDebtRequest.namePerson });

      if (existingDebt) {
        existingDebt.debts = existingDebt.debts.concat(newDebtRequest.debts);
        await existingDebt.save();
        this.logger.log('Debt updated successfully');
        return new ApiResponseDto(200, 'Debt post successfully', []);
      } else {
        const newDebt = new this.DebtModel({
          namePerson: newDebtRequest.namePerson,
          debts: newDebtRequest.debts,
        });
        await newDebt.save();
        this.logger.log('Debt created successfully');
        return new ApiResponseDto(200, 'Debt post successfully', []);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return new ApiResponseDto(500, 'Internal Server Error', []);
    }
  }
}
