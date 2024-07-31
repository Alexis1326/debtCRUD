import {
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { ApmInterceptor } from '../../../share/domain/config/apm.interceptor';
import { deleteUserService } from 'src/deleteUser/application/deleteUser.service';

@ApiTags('deleteUser')
@Controller('deleteUser')
@UseInterceptors(ApmInterceptor)
export class deleteUserController {
  private readonly logger = new Logger(deleteUserController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: deleteUserService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Delete(':namePerson')
  async deleteDebt(
    @Res() res: Response,
    @Param('namePerson') namePerson: string,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller deleteUser message', {
        request: { namePerson },
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.deleteDebt(namePerson);
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/deleteUser finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
