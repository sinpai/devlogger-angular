import { Component, OnInit } from '@angular/core';

// Service
import { ProjectsService } from '../../../services/projects.service';
import { UuidService } from '../../../services/uuid.service';
import { AlertService } from '../../../services/alert.service';

// Models
import { Log } from '../../../models/Log';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectId: string;
  name: string;
  logs: Log[];
  isNew = true;

  constructor(
    public projectService: ProjectsService,
    public uuidService: UuidService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.projectService.selectedObsProject.subscribe( project => {
      if ( project.projectId !== null ) {
        this.isNew = false;
        this.projectId = project.projectId;
        this.name = project.name;
        this.logs = project.logs;
      }
    });
  }

  onSubmit() {
    if ( this.isNew ) {
      const newProj = {
        projectId: this.uuidService.generate(),
        name: this.name,
        logs: []
      };
      this.projectService.addProject(newProj);
      this.alertService.showMessage('Project created!', 'success');
    } else {
      const updProj = {
        projectId: this.projectId,
        name: this.name,
        logs: this.logs
      };
      this.projectService.updateProject(updProj);
      this.alertService.showMessage('Project changed!', 'success');
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.projectId = '';
    this.name = '';
    this.logs = [];

    this.projectService.clearState();
  }


}
