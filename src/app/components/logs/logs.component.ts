import { Component, OnInit } from '@angular/core';
import { LogService } from "../../services/log.service";
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear =>{
      if (clear) {
        this.selectedLog = {id:'',text:'',date:''};
      }
    })
  // this.logs = this.logService.getLogs();
  this.logService.getLogs().subscribe(logs => {
    this.logs = logs;
    this.loaded = true;
  });
  }

  onselectedLog(log: Log) {
   // console.log(log);
   this.logService.setFormLog(log);
   this.selectedLog = log;
  }

  onDelete(log: Log) {
   // console.log(log);
   if (confirm('Are you sure?')) {
     this.logService.deleteLog(log);
   }
  }

}
