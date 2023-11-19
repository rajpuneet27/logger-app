import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AppService } from '../app.service';


@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  previewData: any[] = []
  tableData: any[] = []

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.appService.getLogsData().subscribe(data => {
      console.log(data.log)
      this.tableData = data.log;
      this.previewData = this.tableData
    })
    
  }


  tableHeaders = ['Id','Level','Message','Resource ID','Timestamp','Trace ID','Span ID','Commit','Parent Resource ID'];

  // tableData = [
  //   {id: 1,level: 'error',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-456',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 2,level: 'success',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-12T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-459',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 3,level: 'warning',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-11T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-458',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 4,level: 'error',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-09T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-457',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 5,level: 'success',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-450',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 6,level: 'warning',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-451',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 7,level: 'error',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-452',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 8,level: 'success',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-453',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 9,level: 'warning',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-456',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 10,level: 'error',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-456',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 11,level: 'success',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-456',commit: '5e5342f',parentResourceId: 'server-0987'},
  //   {id: 12,level: 'warning',message: 'Failed to connect to DB',resourceId: 'server-1234',timestamp: '2023-09-15T08:00:00Z',traceId: 'abc-xyz-123',spanId: 'span-456',commit: '5e5342f',parentResourceId: 'server-0987'},
  // ];

  private padZero(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }
  private formatDateTime(dateTime: Date): string {
    const year: number = dateTime.getFullYear();
    const month: number = dateTime.getMonth() + 1;
    const day: number = dateTime.getDate();
    const hours: number = dateTime.getHours();
    const minutes: number = dateTime.getMinutes();
    const seconds: number = dateTime.getSeconds();
    const formattedDateTime: string = `${year}-${this.padZero(month)}-${this.padZero(day)}_${this.padZero(hours)}-${this.padZero(minutes)}-${this.padZero(seconds)}`;
    return formattedDateTime;
  }

  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
    const currentDateTime: Date = new Date();
    const formattedDateTime: string = this.formatDateTime(currentDateTime);
    XLSX.writeFile(wb, `${fileName}_${formattedDateTime}.xlsx`);
  }
  exportLogsData(): void {
    this.exportToExcel(this.previewData, 'logs_info');
  }

  selectErrorLogs(): void{
    this.previewData = []
    this.tableData.forEach(x => {
      if(x.level == 'error'){
        this.previewData.push(x)
      }
    })
  }

  selectSuccessLogs(): void{
    this.previewData = []
    this.tableData.forEach(x => {
      if(x.level == 'success'){
        this.previewData.push(x)
      }
    })
  }

  selectWarningLogs(): void{
    this.previewData = []
    this.tableData.forEach(x => {
      if(x.level == 'warning'){
        this.previewData.push(x)
      }
    })
  }

  resetLogs(): void{
    this.previewData = this.tableData
  }

}
