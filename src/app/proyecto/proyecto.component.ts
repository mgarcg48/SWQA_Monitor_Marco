import { Component, OnInit, Inject } from '@angular/core';
import { Proyecto } from '../Modelos/proyecto';
import { ProyectoService } from '../Servicios/proyecto.service';
import {MatPaginator, MatSort, MatTableDataSource, MatBottomSheetRef} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewChild } from '@angular/core';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatDialogConfig
} from '@angular/material';
import {MatBottomSheet} from '@angular/material';
import { convertToR3QueryMetadata } from '@angular/core/src/render3/jit/directive';
import { ConfiguracionService } from '../Servicios/configuracion.service';
import { Configuracion } from '../Modelos/configuracion';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})



export class ProyectoComponent implements OnInit {

  proyectos: Proyecto[];
  displayedColumns: string[] = ['id', 'nombre', 'identificador', 'resultados', 'select'];
  MyDataSource: any;
  selection = new SelectionModel<Proyecto>(true, []);
  proyecto = new Proyecto();
  submitted = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor( private proyectoService: ProyectoService, private http: HttpClient, private dialog: MatDialog, private dialogConfig: MatDialog) {}

  ngOnInit() {
    this.getProyectos();
    console.log(this.proyectos);
  }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(event, index, item) {

    console.log(index, event, item);
    this.proyectoService.getProyecto(index)
      .subscribe(
        proyecto => {
        proyecto.seguimiento = !proyecto.seguimiento;
        console.log(proyecto);
        this.proyectoService.updateProyecto(proyecto)
          .subscribe(() => console.log('No entra aqui'));
        });

}

  getProyectos() {
   return this.proyectoService.getProyectos()
      .subscribe(
          proyectos => {
          console.log(proyectos);
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = proyectos;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
          this.proyectos = proyectos;

          }
        );
  }

  newProyecto(): void {
    this.submitted = false;
    this.proyecto = new Proyecto();
  }

 addProyecto() {
   this.submitted = true;
   this.save();
 }

  private save(): void {
    this.proyectoService.addProyecto(this.proyecto)
        .subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.afterClosed().subscribe(() => (this.ngOnInit()));
    console.log('acabo de cerrar el cuadro de dialogo');
  }
  openDialogConf() {
    const dialogRef = this.dialogConfig .open(ConfigurationDialog);
    dialogRef.afterClosed().subscribe(() => (this.ngOnInit()));

  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styleUrls: ['./proyecto.component.css']
})
export class ConfirmationDialog {
  constructor(
    public dialogEef: MatDialogRef<ConfirmationDialog>, private proyectoService: ProyectoService
  ) {}

  proyecto = new Proyecto();
  submitted = false;

  addProyecto() {
    this.submitted = true;
    this.save();
  }

  private save(): void {
    this.proyectoService.addProyecto(this.proyecto).subscribe();
  }

  newProyecto(): void {
    this.submitted = false;
    this.proyecto = new Proyecto();
  }
}

@Component({
  selector: 'configuration-dialog',
  templateUrl: 'configuration-dialog.html',
  styleUrls: ['./proyecto.component.css']
})
export class ConfigurationDialog {
  constructor(
    public dialogEef: MatDialogRef<ConfigurationDialog>,
    private configuracionService: ConfiguracionService
  ) {}

    configuracion = new Configuracion();
    select: any;

  periodo = [
    {valor: 'diario', muestraValor: 'Diariamente'},
    {valor: 'semanal', muestraValor: 'Semanalmente'},
    {valor: 'mensual', muestraValor: 'Mensualmente'},
  ];


  ngOnInit() {
    this.configuracionService.getConfiguracion(1).subscribe(config =>
      this.select = config.periodo);
      console.log(this.select);
    console.log(this.configuracion);
  }

  save(): void {
    this.getConfiguracion(1);
  }

  getConfiguracion(identificador: number) {



    this.configuracionService.getConfiguracion(identificador)
      .subscribe(configuracion => {
        console.log(this.select);
        if (this.select === 'Diariamente') {
          configuracion.periodo = '* 1 * * *';
          console.log('Diariamente');
        } else if (this.select === 'Semanalmente') {
          configuracion.periodo = '* * 1 * *';
          console.log('Semanalmente');
        } else {
          configuracion.periodo = '* * * 1 *';
          console.log('Mensualmente');
        }


        this.configuracionService.updateConfiguracion(configuracion).subscribe();
        console.log(this.configuracion);
      });
  }

}


