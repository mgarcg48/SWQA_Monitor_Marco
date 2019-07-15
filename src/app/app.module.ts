import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareaComponent } from './tarea/tarea.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProyectoComponent, ConfigurationDialog } from './proyecto/proyecto.component';
import { ConfirmationDialog, } from './proyecto/proyecto.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ProyectoTareasComponent } from './proyecto-tareas/proyecto-tareas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatFormFieldModule
} from '@angular/material';

import { PlotlyModule } from 'angular-plotly.js';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    ProyectoComponent,
    ConfirmationDialog,
    ConsultaComponent,
    ProyectoTareasComponent,
    ConfigurationDialog,
    ConfiguracionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    PlotlyModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgbModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialog, ConfigurationDialog],
})
export class AppModule { }
