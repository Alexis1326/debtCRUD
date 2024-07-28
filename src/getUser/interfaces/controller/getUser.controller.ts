import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { ApmInterceptor } from '../../../share/domain/config/apm.interceptor';
import { getUserService } from '../../application/getUser.service';

/**
 * @description Controlador responsable de manejar las solicitudes entrantes.
 */
@ApiTags('getUser')
@Controller('getUser')
@UseInterceptors(ApmInterceptor)
export class getUserController {
  private readonly logger = new Logger(getUserController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: getUserService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Get()
  async getUser(
    @Res() res: Response,
    @Query('namePerson') namePerson: string,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: { namePerson },
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.getUser(namePerson);
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/getDebt finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
