import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../Modelos/consulta';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private consultaUrl = 'http://localhost:5000/api/consulta';

  constructor(private http: HttpClient) {

  }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.consultaUrl)
  }

  getConsultasIdentificador(identificador: number): Observable<Consulta[]> {
    const urlIdentificador = `${this.consultaUrl}/identificador/${identificador}`;
    return this.http.get<Consulta[]>(urlIdentificador);
  }

  getConsultaId(id: number): Observable<Consulta>{
    const urlId = `${this.consultaUrl}/${id}`;
    return this.http.get<Consulta>(urlId);
  }

}
