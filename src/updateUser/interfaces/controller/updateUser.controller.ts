import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { ApmInterceptor } from '../../../share/domain/config/apm.interceptor';
import { updateUserService } from '../../application/updateUser.service';
import { UpdateDto } from 'src/share/domain/dto/updateDbt.dto';

/**
 * @description Controlador responsable de manejar las solicitudes entrantes.
 */
@ApiTags('updateUser')
@Controller('updateUser')
@UseInterceptors(ApmInterceptor)
export class updateUserController {
  private readonly logger = new Logger(updateUserController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: updateUserService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Patch(':id')
  async updateDebt(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDto,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller updateUser message', {
        request: { id, updateDebtDto },
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.updatedDebt(id, updateDebtDto);
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/updateDebt finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
