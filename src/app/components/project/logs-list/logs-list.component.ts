import { Component, OnInit, Input } from '@angular/core';

// Services
import { ProjectsService } from '../../../services/projects.service';
import { AlertService } from '../../../services/alert.service';

// Models
import {Log} from '../../../models/Log';


@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  @Input() logs: Log[];
  @Input() currentRouteId: string;
  selectedLog: Log;

  constructor(
    public projectService: ProjectsService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.projectService.stateClear.subscribe( clearState => {
      if ( clearState ) {
        this.selectedLog = {
                id: '',
                text: '',
                date: ''
              };
      }
    });
  }

  onSelect(log: Log) {
    this.projectService.setFormLog(log);
    this.selectedLog = log;
  }

  deleteLog(log: Log) {
    this.projectService.deleteLog(log, this.currentRouteId);
    this.alertService.showMessage('Log has been deleted!', 'success');
  }

}
