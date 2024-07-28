import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { Model } from 'mongoose';
import { Debt } from '../../share/domain/entities/deuda.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDto } from 'src/share/domain/dto/updateDbt.dto';

/**
 * @description Clase servicio responsable de recibir el parámetro y realizar la lógica de negocio.
 */
@Injectable()
export class updateUserService {
  private readonly logger = new Logger(updateUserService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,

    @InjectModel(Debt.name)
    private readonly DebtModel: Model<Debt>
  ) { }

  async findOne(term: string) {

    let user: Debt;

    if (!isNaN(+term)) {
      user = await this.DebtModel.findOne({ no: term });
    }

    // Name
    if (!user) {
      user = await this.DebtModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!user)
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return user;
  }
  public async updatedDebt(id: string, updateDebtDto: UpdateDto): Promise<ApiResponseDto> {

    const userUpdate = await this.findOne(id);

    try {
      if (updateDebtDto.namePerson)
        updateDebtDto.namePerson = updateDebtDto.namePerson.toLowerCase();

      await userUpdate.updateOne(updateDebtDto, { new: true });
      this.logger.log('Debt updated successfully');
      return new ApiResponseDto(200, 'Debt updated successfully', userUpdate);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return new ApiResponseDto(500, 'Internal Server Error', null);
    }
  }
}
