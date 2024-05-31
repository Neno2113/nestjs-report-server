import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHellowReport, getEmploymentLetter, getEmploymentLetterById } from 'src/reports';


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

  constructor(
    private readonly printerService: PrinterService
  ){
    super();
  }

  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  hello() {

    const docDefinition = getHellowReport({ name: 'Anel Gabriel Dominguez'});

    const doc = this.printerService.createPdf(docDefinition);

    return doc;


  }

  employmentLetter(){

    const docDefinition = getEmploymentLetter();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;

  }

  async employmentLetteById( employeeId: number ){

    const employee = await this.employees.findUnique({
      where: {
        id: employeeId
      }
    })

    if( !employee ) {
      throw new NotFoundException(`Employee id ${employeeId} not found.`)
    }

    const docDefinition = getEmploymentLetterById({
      employeerName: 'Anel Dominguez',
      employeerPosition: 'Gerente TI',
      employeeCompany: 'AD Soluciones',
      employeName: employee.name,
      employeePosition: employee.position,
      employeeHours: employee.hours_per_day.toString(),
      employeeStartDate: employee.start_date.toString(),
      employeeWorkSchedule: employee.work_schedule
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;

  }
}
