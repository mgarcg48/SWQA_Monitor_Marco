import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../Modelos/proyecto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private proyectoUrl = 'http://localhost:5000/api/proyecto';

  constructor(
    private http: HttpClient
  ) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.proyectoUrl);
  }

  updateProyecto (proyecto: Proyecto): Observable<any> {
    return this.http.put(this.proyectoUrl, proyecto, httpOptions);
  }

  getProyecto(id: number): Observable<Proyecto> {
    const url = `${this.proyectoUrl}/${id}`;
    return this.http.get<Proyecto>(url);
  }

  addProyecto (proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.proyectoUrl, proyecto, httpOptions);
  }
}
