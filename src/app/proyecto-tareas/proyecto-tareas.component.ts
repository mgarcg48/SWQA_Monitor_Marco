import { Component, OnInit } from '@angular/core';
import { Tarea } from '../Modelos/tarea';
import { TareaService } from '../Servicios/tarea.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Consulta } from '../Modelos/consulta';
import { ConsultaService } from '../Servicios/consulta.service';

@Component({
  selector: 'app-proyecto-tareas',
  templateUrl: './proyecto-tareas.component.html',
  styleUrls: ['./proyecto-tareas.component.css']
})
export class ProyectoTareasComponent implements OnInit {

  tarea:  Tarea[];
  consulta: Consulta;

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

  id: number;

  fechasTimestamp: number[] = [];
  fechas: Date[] = [];
  minFecha: Date = new Date('0000000000');
  maxFecha: Date = new Date(2020, 0, 1);

  constructor(
    private tareaService: TareaService,
    private route: ActivatedRoute,
    private location: Location,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id');

    this.getConsultasIdentificador(this.id);
    console.log(this.id);

  }


  getTareasIdentificador(identificador: number) {

    return this.tareaService.getTareasIdentificador(identificador)
      .subscribe(tarea => {
        this.tarea = tarea;
      });
  }

  getConsultasIdentificador(identificador: number) {
    return this.consultaService.getConsultaId(identificador)
    .subscribe(
      consulta => {
        console.log(consulta);
        this.consulta = consulta;
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
        // Vamos cogiendo cada una de las consultas que tiene el proyecto

          this.testPasados = 0;
          this.testFallados = 0;
          this.testSkipeados = 0;
          this.testUndefined = 0;
          let b: any;
          this.contadorFeature = 0;
          const fechaAux = new Date(this.consulta.fecha);
          this.fechas[cuentaEjecucion] = consulta.fecha;
          this.fechasTimestamp[cuentaEjecucion] = fechaAux.getTime();
          cuentaEjecucion++;
          // Features que tenemos dentro de una consulta
          for (b of this.consulta.artefacto) {

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



        this.scenarios = (this.scenariosPasados[this.scenariosPasados.length - 1] + this.scenariosFallados[this.scenariosPasados.length - 1]);
        console.log(this.scenarios);
        console.log(this.scenariosPasados);
        console.log(this.scenariosFallados);
        console.log(scenariosPgeneral);
        console.log(scenariosFgeneral);
        this.porcentajePasados = this.scenariosPasados[this.scenariosPasados.length - 1] / this.scenarios * 100;
        this.porcentajeFallados = this.scenariosFallados[this.scenariosPasados.length - 1] / this.scenarios * 100;

        for (let i = 0; i < this.featureResult.length; i++) {
          if (this.featureResult[i] === 'Failed') {
            this.resultadoFinal = 'Failed';
          } else {
            this.resultadoFinal = 'Passed';
          }
        }
      }
      );
  }


  goBack(): void {
    this.location.back();
  }

  public nuevaPes() {
    window.open('tareas/:identificador');
  }

}
