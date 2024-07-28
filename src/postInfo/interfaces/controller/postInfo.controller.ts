import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { debtCrudService } from '../../application/postInfo.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { ApmInterceptor } from '../../../share/domain/config/apm.interceptor';
import { DebtCrudRequest } from 'src/share/domain/dto/debtCrudRequest.dto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('postDebt')
@Controller('postDebt')
@UseInterceptors(ApmInterceptor)
export class NewContractController {
  private readonly logger = new Logger(NewContractController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: debtCrudService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Post()
  async createdebt(
    @Res() res: Response,
    @Body() payload: DebtCrudRequest,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: payload,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.createDebt(
        payload,
      );
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/NewContract finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
