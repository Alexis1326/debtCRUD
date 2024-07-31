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

@Injectable()
export class deleteUserService {
  private readonly logger = new Logger(deleteUserService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Debt.name) private readonly debtModel: Model<Debt>
  ) {}

  async findOne(term: string): Promise<Debt> {
    const searchTerm = term.toLowerCase().trim();
    this.logger.log(`Searching for Debt with namePerson: "${searchTerm}"`);

    const user = await this.debtModel.findOne({ namePerson: searchTerm });

    if (!user) {
      this.logger.warn(`Debt with namePerson "${searchTerm}" not found`);
      throw new NotFoundException(`Debt with namePerson "${searchTerm}" not found`);
    }

    this.logger.log(`Debt found: ${JSON.stringify(user)}`);
    return user;
  }

  public async deleteDebt(namePerson: string): Promise<ApiResponseDto> {
    try {
      const userDelete = await this.findOne(namePerson);
      await this.debtModel.deleteOne({ namePerson: userDelete.namePerson });
      this.logger.log('Debt deleted successfully');
      return new ApiResponseDto(200, 'Debt deleted successfully', []);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
