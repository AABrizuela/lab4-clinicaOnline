import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AltaUsuarioComponent } from './components/altas/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/altas/alta-profesional/alta-profesional.component';
import { HomePacienteComponent } from './components/home/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home/home-profesional/home-profesional.component';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { AltaAdminComponent } from './components/altas/alta-admin/alta-admin.component';
import { HabilitarProfComponent } from './components/habilitar-prof/habilitar-prof.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';
import { AuthGuardGuard } from './guards/auth-guard.guard'
import { ErrorComponent } from './components/error/error.component';
import {ProfesionalGuard} from './guards/profesional.guard'
import { AltaTurnoComponent } from './components/turnos/alta-turno/alta-turno.component';
import { ListadoProfesionalesComponent } from './components/turnos/listado-profesionales/listado-profesionales.component';
import { SacarTurnoComponent } from './components/turnos/sacar-turno/sacar-turno.component';
import { MisTurnosPacienteComponent } from './components/turnos/mis-turnos-paciente/mis-turnos-paciente.component';
import { TurnosRecibidosComponent } from './components/turnos/turnos-recibidos/turnos-recibidos.component';
import { HomeProfesionalNoHabilitadoComponent } from './components/home/home-profesional-no-habilitado/home-profesional-no-habilitado.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent, children: [
    { path:'paciente', component: AltaUsuarioComponent},
    { path:'profesional', component: AltaProfesionalComponent}
  ]},
  { path: 'home', children: [
    {path: '' , component: HomePacienteComponent},
    {path: 'profesional', component: HomeProfesionalComponent, canActivate: [ProfesionalGuard]},
    {path: 'admin', component: HomeAdminComponent},
    {path: 'profesional/no_habilitado', component: HomeProfesionalNoHabilitadoComponent},
  ], canActivate: [AuthGuardGuard]},
  {path: 'admin', children: [
    { path: 'registro', component: AltaAdminComponent},
    { path: 'habilitar_profesional', component: HabilitarProfComponent},
    { path: 'especialidades_profesional', component: AgregarEspecialidadComponent},
  ], canActivate: [AuthGuardGuard]},
  { path: 'error', component: ErrorComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'}, 
  { path: 'profesional', children:[
    { path: 'horarios', component: AltaTurnoComponent },
    { path: 'turnos_recibidos', component: TurnosRecibidosComponent}
  ], canActivate: [AuthGuardGuard]},
  { path: 'paciente', children:[
    { path: 'obtener_turno', component: SacarTurnoComponent},
    { path: 'mis_turnos', component: MisTurnosPacienteComponent}
  ], canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
