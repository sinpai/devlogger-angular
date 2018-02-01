import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectFormComponent } from './components/home/project-form/project-form.component';
import { ProjectListComponent } from './components/home/project-list/project-list.component';
import { LogsListComponent } from './components/project/logs-list/logs-list.component';
import { LogsFormComponent } from './components/project/logs-form/logs-form.component';
import { AlertsComponent } from './components/alerts/alerts.component';

// Routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { ProjectsService } from './services/projects.service';
import { UuidService } from './services/uuid.service';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    AboutComponent,
    NotFoundComponent,
    NavbarComponent,
    ProjectFormComponent,
    ProjectListComponent,
    LogsListComponent,
    LogsFormComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ ProjectsService, UuidService, AlertService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
