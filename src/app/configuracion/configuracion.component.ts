import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../Modelos/configuracion';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  configuracion: Configuracion;

  constructor() { }

  ngOnInit() {

  }

}
