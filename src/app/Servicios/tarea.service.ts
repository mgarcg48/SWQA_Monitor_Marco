import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../Modelos/tarea';

const httpOptions = {
	headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TareaService  {
	private tareaUrl = 'http://localhost:5000/api/tareas';

  constructor(
  	private http: HttpClient
  ) { }

  getTareas (): Observable<Tarea[]> {
  	return this.http.get<Tarea[]>(this.tareaUrl)
  }

  getTareasIdentificador(identificador: number): Observable<Tarea[]> {
  	const url = `${this.tareaUrl}/${identificador}`;
    
  	return this.http.get<Tarea[]>(url);
  }

  getTareasUsuario(usuario: string): Observable<Tarea[]> {
    const url = `${this.tareaUrl}/user/${usuario}`;
    return this.http.get<Tarea[]>(url);
  }


}
