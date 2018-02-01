import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Models
import { Log } from '../models/Log';
import { Project } from '../models/Project';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectsService {

  projects: Project[];
  selectedProject: Project;

  private logSource = new BehaviorSubject<Log>({
    id: null, text: null,  date: null
  });
  selectedLog = this.logSource.asObservable();

  private projectSource = new BehaviorSubject<Project>( {
    projectId: null, name: null,  logs: []
  });
  selectedObsProject = this.projectSource.asObservable();

  private stateSource = new BehaviorSubject<Boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.projects = JSON.parse(localStorage.getItem('projects'))  || [];
  }

  getAllProject(): Observable<Project[]> {
    return of(this.projects);
  }

  getProject(id) {
    this.projects.forEach( (current, index) => {
      if ( current.projectId === id ) {
        this.selectedProject = current;
      }
    });
    return of(this.selectedProject);
  }

  addProject(project) {
    this.projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  deleteProject(project) {
    this.projects.splice(project, 1);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  updateProject(project) {
    this.projects.forEach((projectIter, i) => {
      if ( projectIter.projectId === project.projectId ) {
        this.projects.splice(i, 1);
        this.projects.unshift(project);
      }
    });
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addLog(log: Log, projectId) {
    this.projects.forEach(project => {
      if ( project.projectId === projectId ) {
        project.logs.unshift(log);
      }
    });
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  updateLog(log: Log, projectId) {
    this.projects.forEach(project => {
      if ( project.projectId === projectId ) {
        project.logs.forEach( (value, i) => {
          if ( value.id === log.id ) {
            project.logs.splice(i, 1);
          }
        });

        project.logs.unshift(log);
      }
    });
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  setFormProject(project: Project) {
    this.projectSource.next(project);
  }

  clearState(){
    this.stateSource.next(true);
    this.logSource.next({id: null, text: null,  date: null});
  }

  deleteLog(log: Log, projectId) {
    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        project.logs.forEach((value, i) => {
          if (value.id === log.id) {
            project.logs.splice(i, 1);
          }
        });
      }
    });
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

}
