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
  selectedFilter: string = 'level';
  value: string = '';
  filterBox: boolean= false
  searchKeyword: string = ''

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.appService.getLogsData().subscribe(data => {
      console.log(data)
      this.tableData = data;
      this.previewData = this.tableData
    })
  }


  tableHeaders = ['Id','Level','Message','Resource ID','Timestamp','Trace ID','Span ID','Commit','Parent Resource ID'];

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
    this.value = 'error'
    this.appService.getSearchDataService(this.value, 'level').subscribe(data => {
      this.previewData = data.logs;
    })
  }

  selectSuccessLogs(): void{
    this.previewData = []
    this.value = 'success'
    this.appService.getSearchDataService(this.value, 'level').subscribe(data => {
      this.previewData = data.logs;
    })
  }

  selectWarningLogs(): void{
    this.previewData = []
    this.value = 'warning'
    this.appService.getSearchDataService(this.value, 'level').subscribe(data => {
      this.previewData = data.logs;
    })
  }

  resetLogs(): void{
    this.previewData = []
    this.appService.getLogsData().subscribe(data => {
      console.log(data)
      this.tableData = data;
      this.previewData = this.tableData
    })
  }

  openFilter(){
    this.filterBox = !this.filterBox;
  }

  onSubmit() {
    this.filterBox = false
    console.log('Selected Filter:', this.selectedFilter);
  }

  performSearch() {
    if (this.searchKeyword.trim() !== '') {
      console.log("132456")
      this.previewData = []
      this.value = this.searchKeyword
      this.appService.getSearchDataService(this.value, this.selectedFilter).subscribe(data => {
        this.previewData = data.logs;
      })
    }
  }

}
