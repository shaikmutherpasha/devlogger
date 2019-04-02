import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated Components",
    //     date: new Date('03/24/2019 00:15:40')
    //   },
    //   {
    //     id: "2",
    //     text: "Added Bootstrap",
    //     date: new Date('03/25/2019 01:15:40')
    //   },
    //   {
    //     id: "3",
    //     text: "Log Components",
    //     date: new Date('03/26/2019 02:15:40')
    //   },
    // ]

    this.logs = [];
  }

  // getLogs() {
  //   return this.logs;
  // }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
   this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs ));
  }

  updateLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1)
      }
    });
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs ));
  }

  deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1)
      }
    });

    localStorage.setItem('logs', JSON.stringify(this.logs ));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
