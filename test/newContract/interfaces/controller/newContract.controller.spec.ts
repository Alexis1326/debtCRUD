import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponseDto } from '../../../../src/share/domain/dto/apiResponse.dto';
import { debtCrudService } from '../../../../src/newContract/application/debtCrud.service';
import { NewContractController } from '../../../../src/newContract/interfaces/controller/newContract.controller';
import { NewContractResponse } from '../../../../src/newContract/domain/dto/newContractResponse.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DebtCrudRequest } from '../../../../src/newContract/domain/dto/debtCrudRequest.dto';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';
import { TransaccionIdProvider } from '../../../../src/share/domain/config/transactionId.provider';
import { ApmService } from '../../../../src/share/domain/config/apm.service';

jest.mock('../../../../src/newContract/application/newContract.service');
describe('New Contract Controller', () => {
  let service: debtCrudService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NewContractController],
      providers: [
        debtCrudService,
        TransaccionIdProvider,
        ProcessTimeService,
        ApmService,
      ],
    }).compile();

    service = moduleRef.get<debtCrudService>(debtCrudService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('New Contract Controller', () => {
    it('Initialize - Success', async () => {
      expect(app).toBeDefined();
    });

    it('Must response OK', async () => {
      const payloadNewContract: DebtCrudRequest = {
        SIMSI: 'string',
        INCALLDUR: 'string',
        INDN_NUM: 'string',
        INESNICCID: 'string',
        INIMEI: 'string',
        INCEDULA: 'string',
        INDEALERID: 'string',
        INSPCODE: 'string',
        INTMCODE: 'string',
        INHLCODE: 'string',
        INCODDIST: 'string',
        INCODDEALERNEG: 'string',
        INANI7DIGIT: 'string',
      };

      jest
        .spyOn(service, 'procedimientoActivacion')
        .mockResolvedValue(
          new ApiResponseDto(
            200,
            'OK',
            new NewContractResponse('OUTCOD_RES', 0, 0, 0, 'OUTCO_ID'),
          ),
        );

      return request(app.getHttpServer())
        .post('/NewContract')
        .send(payloadNewContract)
        .expect(200)
        .expect((response) => {
          expect(response.body.responseCode).toEqual(200);
          expect(response.body.message).toEqual('OK');
          expect(service.procedimientoActivacion).toBeCalledWith(
            payloadNewContract,
          );
        });
    });
  });
});
