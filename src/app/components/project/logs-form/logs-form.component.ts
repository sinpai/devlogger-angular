import { Component, OnInit, Input } from '@angular/core';

// Services
import { ProjectsService } from '../../../services/projects.service';
import { UuidService } from '../../../services/uuid.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.css']
})
export class LogsFormComponent implements OnInit {

  @Input() currentRouteId: string;

  id: string;
  text: string;
  date: string;

  isNew = true;

  constructor(
    public projectService: ProjectsService,
    public uuid: UuidService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.projectService.selectedLog.subscribe( log => {
      if ( log.id !== null ) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {

    if ( this.isNew ) {
      const newLog = {
        id: this.uuid.generate(),
        text: this.text,
        date: new Date()
      };

      this.projectService.addLog(newLog, this.currentRouteId);
      this.alertService.showMessage('Log has been created!', 'success');
    } else {
      const updLog = {
        id: this.id,
        text: this.text,
        date: this.date
      };

      this.projectService.updateLog(updLog, this.currentRouteId);
      this.alertService.showMessage('Log has been updated!', 'success');
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';

    this.projectService.clearState();
  }

}
