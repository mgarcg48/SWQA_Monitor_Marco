import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuracion } from '../Modelos/configuracion';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private configuracionUrl = 'http://localhost:5000/api/configuracion';

  constructor(private http : HttpClient) { }



  updateConfiguracion(configuracion: Configuracion): Observable<any> {
    return this.http.put(this.configuracionUrl, configuracion, httpOptions);
  }

  getConfiguracion(id: number): Observable<Configuracion> {
    const url = `${this.configuracionUrl}/${id}`;
    console.log(url);
    return this.http.get<Configuracion>(url);
  }
}
