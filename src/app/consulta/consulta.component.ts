import { Component, OnInit, Input, Inject } from '@angular/core';
import { Consulta } from '../Modelos/consulta';
import { ConsultaService } from '../Servicios/consulta.service';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';

import * as Plotly from 'plotly.js';

import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

  ],
})
export class ConsultaComponent implements OnInit {

  consultas: Consulta[] = [];

  panelOpenState = false;

  todasLasFeatures: string[] = [];
  todosLosScenariosPasados: number[] = [];
  todosLosScenariosFallados: number[] = [];
  contadorGlobal = 0;
  scenarios = 0;
  porcentajePasados = 0;
  porcentajeFallados = 0;

  // total de test p/f/u/s
  testFallados = 0;
  testPasados = 0;
  testSkipeados = 0;
  testUndefined = 0;

  skipeados: number[] = [];
  undefineds: number[] = [];
  // Guardamos el resultado de cada feature junto con su nombre
  featureResult: string[] = [];
  nombreFeature: string[] = [];
  resultadoFinal: string;
  // Test p/f/u/s de cada feature
  falladosFeature: number[] = [];
  pasadosFeature: number[] = [];
  skipeadosFeature: number[] = [];
  undefinedFeature: number[] = [];

  featureSinRepetir: string[] = [];
  // Scenarios f/p/u/s de cada feature
  falladosScenario: number[] = [];
  pasadosScenario: number[] = [];
  skipeadosScenario: number[] = [];
  undefinedScenario: number[] = [];
  // scenarios que tiene cada feature
  contadorFeature = 0;
  scenariosFeature: number[] = [];
  scenariosFalladosFeature: number[] = [];
  scenariosPasadosFeature: number[] = [];
  scenariosSkipeadosFeature: number[] = [];
  scenariosUndefinedFeature: number[] = [];

  scenariosFallados: number[] = [];
  scenariosPasados: number[] = [];

  arrayContador: number[] = [];

  fechasTimestamp: number[] = [];
  fechas: Date[] = [];
  minFecha: Date = new Date('0000000000');
  maxFecha: Date = new Date(2020, 0, 1);

  maxDatePicker: Date = new Date();
  minDatePicker: Date = new Date();


  constructor(
    private spinner: NgxSpinnerService,
    private consultaService: ConsultaService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<any>,
  ) {}

  ngOnInit() {
    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => { return 1; }
    this.spinner.show();
    setTimeout(() => {
      /* spinner ends after 5 seconds */
      this.spinner.hide();
    }, 8000);
    const iden = +this.route.snapshot.paramMap.get('identificador');
    // this.getConsultasIdentificador(iden);

    // this.getConsultas();

    this.actualizar(iden);

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  actualizar(identificador: number) {
    this.consultaService.getConsultasIdentificador(identificador)
      .subscribe(
        consultas => {

          let contador = 0;
          // guarda p/f/u/s de cada consulta para que luego sean representados en la grafica
          const fallados: number[] = [];
          const pasados: number[] = [];

          // guarda el numero de consultas
          let contadorFallados = 0;
          let contadorPasados = 0;
          let contadorSkipeados = 0;
          let contadorUndefined = 0;
          // guarda el numero de la feature que estamos analizando
          let cuentascenarios = 0;
          let scenarioPasado = true;

          let scenariosPgeneral = 0;
          let scenariosFgeneral = 0;
          let cuentaEjecucion = 0;
          let scenariosPaux = 0;
          let scenariosFaux = 0;
          const today = Date.now();

          // Vamos cogiendo cada una de las consultas que tiene el proyecto
          for (const a of consultas) {
            this.testPasados = 0;
            this.testFallados = 0;
            this.testSkipeados = 0;
            this.testUndefined = 0;
            let b: any;
            this.contadorFeature = 0;
            const fechaAux = new Date(a.fecha);
            this.fechas[cuentaEjecucion] = a.fecha;
            this.fechasTimestamp[cuentaEjecucion] = fechaAux.getTime();
            cuentaEjecucion++;
            // Features que tenemos dentro de una consulta
            for (b of a.artefacto) {

              this.featureResult[this.contadorFeature] = 'Passed';

              let cuentaFalladosFeature = 0;
              let cuentaPasadosFeature = 0;
              let cuentaSkipeadosFeature = 0;
              let cuentaUndefinedFeature = 0;

              this.nombreFeature[this.contadorFeature] = b.name;
              this.todasLasFeatures[this.contadorGlobal] = b.name;
              this.scenariosPasadosFeature[this.contadorFeature] = 0;
              this.scenariosFalladosFeature[this.contadorFeature] = 0;
              // Elements son los diferentes scenarios de una feature

              for (const c of b.elements) {
                cuentascenarios++;
                /*if(c.steps[0].result.status === "passed"){
                console.log("Este es un scenario passed")
                }*/
                this.scenariosFeature[this.contadorFeature] = cuentascenarios;
                // Consultamos cada step para conocer el resultado
                for (const d of c.steps) {


                  if (d.result.status === 'failed') {
                    this.testFallados++;
                    contadorFallados++;
                    cuentaFalladosFeature++;
                    // this.scenariosFalladosFeature[contadorFeature]++;
                    this.featureResult[this.contadorFeature] = 'Failed';
                    scenarioPasado = false;
                  } else if (d.result.status === 'passed') {
                    this.testPasados++;
                    contadorPasados++;
                    cuentaPasadosFeature++;
                    // this.scenariosPasadosFeature[contadorFeature]++;
                    scenarioPasado = true;
                  } else if (d.result.status === 'skipped') {
                    this.testSkipeados++;
                    contadorSkipeados++;
                    cuentaSkipeadosFeature++;
                    // this.scenariosUndefinedFeature[contadorFeature]++;
                    this.featureResult[this.contadorFeature] = 'Failed';
                    scenarioPasado = false;
                  } else {
                    this.testUndefined++;
                    contadorUndefined++;
                    cuentaUndefinedFeature++;
                    this.featureResult[this.contadorFeature] = 'Failed';
                    // this.scenariosSkipeadosFeature[contadorFeature]++;
                    scenarioPasado = false;
                  }
                }

                if (scenarioPasado) {
                  this.scenariosPasadosFeature[this.contadorFeature]++;
                  scenariosPgeneral++;
                  scenariosPaux++;
                } else {
                  this.scenariosFalladosFeature[this.contadorFeature]++;
                  scenariosFgeneral++;
                  scenariosFaux++;
                }

              }
              cuentascenarios = 0;
              this.falladosFeature[this.contadorFeature] = cuentaFalladosFeature;
              this.pasadosFeature[this.contadorFeature] = cuentaPasadosFeature;
              this.skipeadosFeature[this.contadorFeature] = cuentaSkipeadosFeature;
              this.undefinedFeature[this.contadorFeature] = cuentaUndefinedFeature;
              this.contadorFeature++;

              this.todosLosScenariosPasados[this.contadorGlobal] = scenariosPaux;
              this.todosLosScenariosFallados[this.contadorGlobal] = scenariosFaux;
              this.contadorGlobal++;
              scenariosPaux = 0;
              scenariosFaux = 0;
            }
            // test p/f/s/u de cada una de las pruebas
            fallados[contador] = contadorFallados;
            pasados[contador] = contadorPasados;
            this.skipeados[contador] = contadorSkipeados;
            this.undefineds[contador] = contadorUndefined;

            this.scenariosFallados[contador] = scenariosFgeneral;
            this.scenariosPasados[contador] = scenariosPgeneral;
            scenariosFgeneral = 0;
            scenariosPgeneral = 0;
            this.arrayContador[contador] = contador + 1;
            contador++;
            contadorFallados = 0;
            contadorPasados = 0;
            contadorSkipeados = 0;
            contadorUndefined = 0;

          }
          this.representarDatos();
          this.graficosFeature();
          this.scenarios = (this.scenariosPasados[this.scenariosPasados.length - 1] + this.scenariosFallados[this.scenariosPasados.length - 1]);

          this.porcentajePasados = this.scenariosPasados[this.scenariosPasados.length - 1] / this.scenarios * 100;
          this.porcentajeFallados = this.scenariosFallados[this.scenariosPasados.length - 1] / this.scenarios * 100;
          this.segundaParte(this.nombreFeature[0]);
          const today1 = Date.now();

          for (let i = 0; i < this.featureResult.length; i++) {
            if (this.featureResult[i] === 'Failed') {
              this.resultadoFinal = 'Failed';
              break;
            } else {
              this.resultadoFinal = 'Passed';
            }
          }
        }
      );

  }

  segundaParte(nombreDeLaFearure: string) {

    const posiciones: number[] = [];
    let counter = 0;

    for (let i = 0; i < this.todasLasFeatures.length; i++) {

      if (this.todasLasFeatures[i] === nombreDeLaFearure) {
        posiciones[counter] = i;
        counter++;
      }
    }

    let c = 0;
    const p: number[] = [];
    const f: number[] = [];
    const s: number[] = [];
    const u: number[] = [];

    for (let i = 0; i < posiciones.length; i++) {
      p[c] = this.todosLosScenariosPasados[posiciones[i]];
      f[c] = this.todosLosScenariosFallados[posiciones[i]];
      s[c] = this.skipeadosFeature[posiciones[i]];
      u[c] = this.undefinedFeature[posiciones[i]];
      c++;
    }
    const nombres: string[] = [];
    for (let i = 0; i < c; i++) {
      nombres[i] = 'Prueba ' + i;
    }

    let trace1 = {
      x: nombres,
      y: p,

      name: 'Pasados',
      marker: {
        color: 'rgb(41, 224, 0)'
      }
    } as Plotly.PlotData;
    let trace2 = {
      x: nombres,
      y: f,

      name: 'Fallados',
      marker: {
        color: 'rgb(255, 0, 0)'
      }
    } as Plotly.PlotData;
    let trace3 = {
      x: nombres,
      y: s,

      name: 'Skipeados',
      marker: {
        color: 'rgb(37, 118, 247)'
      },
    } as Plotly.PlotData;
    let trace4 = {
      x: nombres,
      y: u,
      name: 'Undefined',
      marker: {
        color: 'rgb(255, 140, 0)'
      }
    } as Plotly.PlotData;

    const aux = [trace1, trace2];

    const miLayout = {
      title: 'Resumen feature ' + nombreDeLaFearure,
      autosize: true,
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
    };

    Plotly.newPlot('divFeature', aux, miLayout, {responsive: true});

  }

  cambioFechaInicial(event: MatDatepickerInputEvent<Date>) {
    this.minFecha = event.value;
    this.minDatePicker = this.minFecha;

    this.representarDatos();
  }

  cambioFechaFinal(event: MatDatepickerInputEvent<Date>) {
    this.maxFecha = event.value;
    this.maxDatePicker = this.maxFecha;

    this.representarDatos();
  }

  graficosFeature() {

    this.featureSinRepetir = this.nombreFeature.filter((value, index, array) =>
      !array.filter((v, i) => JSON.stringify(value) === JSON.stringify(v) && i < index).length);
  }

  getConsultas() {

    return this.consultaService.getConsultas()
      .subscribe(
        consultas => {
          this.consultas = consultas;
        }
      );
  }

  representarDatos() {

    const ultimatecolors = ['rgb(41, 224, 0)', 'rgb(255, 0, 0)', 'rgb(37, 118, 247)', 'rgb(255, 140, 0)'];

    // GRAFICA PIE CON LOS RESULTADOS DE LOS TEST
    const data = [
      {
        labels: ['Pasados', 'Fallados', 'Skipeados', 'Undefined'],
        values: [this.testPasados, this.testFallados, this.testSkipeados, this.testUndefined],
        marker: {
          colors: ultimatecolors
        },
        type: 'pie'
      } as Plotly.ScatterData
    ];

    // Lineas para el grafico general de la ejecucion
    const fechasValidasTimestamp: number[] = [];
    const fechasValidas: Date[] = [];
    let contadorFechasValidas = 0;
    const scenariosPasadosValidos: number[] = [];
    const scenariosFalladosValidos: number[] = [];
    for (let i = 0; i < this.fechas.length; i++) {
      console.log("Hemos entrado");
      if (this.fechasTimestamp[i] > this.minFecha.getTime() && this.fechasTimestamp[i] < this.maxFecha.getTime()) {
        fechasValidas[contadorFechasValidas] = this.fechas[i];
        console.log(this.fechasTimestamp[i]);
        scenariosPasadosValidos[contadorFechasValidas] = this.scenariosPasados[i];
        scenariosFalladosValidos[contadorFechasValidas] = this.scenariosFallados[i];
        contadorFechasValidas++;
      }
    }

    let lineafail = {
      x: fechasValidas,
      y: scenariosFalladosValidos,
      line: {
        color: 'rgb(255, 0, 0)',
      },
      name: 'Fallados'
    };
    let lineapassed = {
      x: fechasValidas,
      y: scenariosPasadosValidos,
      line: {
        color: 'rgb(41, 224, 0)',
      },
      name: 'Pasados',
    };

    const datos = [lineafail, lineapassed];
    const layout = {
      title: 'Resultados de los test',
      autosize: true,
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
    };


    const pruebas: string[] = [];

    for (let i = 0; i < this.contadorFeature; i++) {
      pruebas[i] = this.nombreFeature[i];
    }

    let trace1 = {
      x: pruebas,
      y: this.scenariosPasadosFeature,
      type: 'bar',
      name: 'Pasados',
      marker: {
        color: 'rgb(41, 224, 0)'
      }
    } as Plotly.PlotData;

    let trace2 = {
      x: pruebas,
      y: this.scenariosFalladosFeature,
      type: 'bar',
      name: 'Fallados',
      marker: {
        color: 'rgb(255, 0, 0)'
      }
    } as Plotly.PlotData;
    let trace3 = {
      x: pruebas,
      y: this.skipeadosFeature,
      type: 'bar',
      name: 'Skipeados',
      marker: {
        color: 'rgb(37, 118, 247)'
      },
    } as Plotly.PlotData;
    let trace4 = {
      x: pruebas,
      y: this.undefinedFeature,
      type: 'bar',
      name: 'Undefined',
      marker: {
        color: 'rgb(255, 140, 0)'
      },
    } as Plotly.PlotData;

    const dados = [trace1, trace2, trace3, trace4];
    const aaa = {
      title: 'Resumen features',
      autosize: true,
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',

      margin : {
        b: 200,
      }
    };

    Plotly.newPlot('otraDiv', dados, aaa, {responsive: true});
    Plotly.newPlot('myDiv1', data, layout, {responsive: true});
    Plotly.newPlot('myDiv', datos, layout, {responsive: true});
  }

  getConsultasIdentificador(identificador: number) {
    return this.consultaService.getConsultasIdentificador(identificador)
      .subscribe(
        consultas => {
          this.consultas = consultas;

        }
      );
  }


}
