import { Component, OnInit } from '@angular/core';

// Services
import { ProjectsService } from '../../services/projects.service';
// Models
import { Project } from '../../models/Project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[];

  constructor(
    public projectServices: ProjectsService
  ) { }

  ngOnInit() {

    this.projectServices.getAllProject().subscribe( projects =>{
      this.projects = projects;
    }, error => {
      console.error(error);
    });

  }

}
