import { Component, OnInit } from '@angular/core';

// Models
import {Alert} from '../../models/Alert';

// Services
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  message: string;
  type: string;
  alertShow = false;

  constructor(
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertShow = false;
    this.alertService.alertToShow.subscribe( alert => {
        this.message = alert.message;
        this.type = alert.type;
        if (alert.message) {
          this.alertShow = true;
          setTimeout(() => {
            this.alertShow = false;
          }, 2000);
        }
    });
  }
}
