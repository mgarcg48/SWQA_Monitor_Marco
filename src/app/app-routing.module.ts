import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoComponent } from './proyecto/proyecto.component';
import { TareaComponent } from './tarea/tarea.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ProyectoTareasComponent } from './proyecto-tareas/proyecto-tareas.component';

const routes: Routes = [
{
path: 'tareas',
component: TareaComponent
},
{
path: 'proyecto',
component: ProyectoComponent
},
{
path: 'tareas/:identificador',
component: ProyectoTareasComponent
},
{
path: 'tareas/user/:usuario',
component: TareaComponent
},
{
path: 'consulta',
component: ConsultaComponent
},
{
path: 'consulta/identificador/:identificador',
component: ConsultaComponent
},
{
path: 'consulta/:id',
component: ProyectoTareasComponent
},
{
path: '',
redirectTo: 'proyecto',
pathMatch: 'full'
},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
