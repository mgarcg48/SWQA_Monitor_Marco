import { Component, OnInit } from '@angular/core';
import { Tarea } from '../Modelos/tarea';
import { Consulta } from '../Modelos/consulta';
import { TareaService } from '../Servicios/tarea.service';
import { ConsultaService } from '../Servicios/consulta.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})

export class TareaComponent implements OnInit {

  tareas: Tarea[];

  tareasIdent: Tarea[];

  tareasUsu: Tarea[];

  consultas: Consulta[] = [];

  displayedColumns: string[] = ['id', 'url', 'identificador', 'fecha'];
  MyDataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  escondidoI: boolean;
  escondidoU: boolean;
  constructor( private tareaService: TareaService, private consultaService: ConsultaService) { }

  ngOnInit() {
    this.getTareas();
    this.getConsultas();
    // this.getTareasIdentificador(3);
    // this.getTareasUsuario("marco");
  }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

  getTareas() {
    return this.tareaService.getTareas()
      .subscribe(
        tareas => {
          console.log(tareas);
          this.tareas = tareas;
        }
      );
  }

  getConsultas() {
    return this.consultaService.getConsultas()
      .subscribe(
        consultas => {
            console.log(consultas);
            this.MyDataSource = new MatTableDataSource();
            this.MyDataSource.data = consultas;
            this.MyDataSource.sort = this.sort;
            this.MyDataSource.paginator = this.paginator;
           this.consultas = consultas;
        }
        );
  }

  getTareasIdentificador(identificador: number) {
    this.escondidoI = false;
    this.escondidoU = true;
    return this.tareaService.getTareasIdentificador(identificador)
      .subscribe(
      tareasIdent => {
        console.log(tareasIdent);
        this.tareasIdent = tareasIdent;
      }
      );
  }

  getTareasUsuario(usuario: string ) {
    this.escondidoU = false;
    this.escondidoI = true;
    return this.tareaService.getTareasUsuario(usuario)
      .subscribe(
        tareasUsu => {
          console.log(tareasUsu);
          this.tareasUsu = tareasUsu;
        }
        );
  }

}
