import { Component, OnInit, Input } from '@angular/core';

// Services
import { ProjectsService } from '../../../services/projects.service';
import { AlertService } from '../../../services/alert.service';

// Models
import { Log } from '../../../models/Log';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[];
  selectedObsProject: Project;

  constructor(
    public projectServices: ProjectsService,
    public alertService: AlertService
  ) { }

  ngOnInit() {

  }

  onSelect(project: Project) {
    this.projectServices.setFormProject(project);
    this.selectedObsProject = project;
  }

  deleteProject(project) {
    this.projectServices.deleteProject(project);
    this.alertService.showMessage('Project has been deleted!', 'success');
  }

}
