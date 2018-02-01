import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Models
import { Alert } from '../models/Alert';

@Injectable()
export class AlertService {

  constructor() { }

  private alertSource = new BehaviorSubject<Alert>({
    message: '', type: ''
  });
  alertToShow = this.alertSource.asObservable();

  showMessage(message, type) {
    message = {
      message: message,
      type: type
    };
    this.alertSource.next(message);
  }

}
