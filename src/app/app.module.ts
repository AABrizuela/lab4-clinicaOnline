import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AltaUsuarioComponent } from './components/altas/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/altas/alta-profesional/alta-profesional.component';

import { AuthService } from './services/auth.service'
import { environment } from '../environments/environment'

import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { HomePacienteComponent } from './components/home/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home/home-profesional/home-profesional.component';
import { AltaAdminComponent } from './components/altas/alta-admin/alta-admin.component';
import { HabilitarProfComponent } from './components/habilitar-prof/habilitar-prof.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';
import { ErrorComponent } from './components/error/error.component';
import { AltaTurnoComponent } from './components/turnos/alta-turno/alta-turno.component';
import { ListadoProfesionalesComponent } from './components/turnos/listado-profesionales/listado-profesionales.component';
import { PedirTurnoComponent } from './components/turnos/pedir-turno/pedir-turno.component';
import { SacarTurnoComponent } from './components/turnos/sacar-turno/sacar-turno.component';
import { ListaHabilitadosPipe } from './pipes/lista-habilitados.pipe';
import { MisTurnosPacienteComponent } from './components/turnos/mis-turnos-paciente/mis-turnos-paciente.component';
import { EstadoNoAtendidoPipe } from './pipes/estado-no-atendido.pipe';
import { EstadoAtendidoPipe } from './pipes/estado-atendido.pipe';
import { TurnosRecibidosComponent } from './components/turnos/turnos-recibidos/turnos-recibidos.component';
import { TurnosPendientesPipe } from './pipes/turnos-pendientes.pipe';
import { TurnosAceptadoPipe } from './pipes/turnos-aceptado.pipe';
import { HomeProfesionalNoHabilitadoComponent } from './components/home/home-profesional-no-habilitado/home-profesional-no-habilitado.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AltaUsuarioComponent,
    AltaProfesionalComponent,
    HomeAdminComponent,
    HomePacienteComponent,
    HomeProfesionalComponent,
    AltaAdminComponent,
    HabilitarProfComponent,
    AgregarEspecialidadComponent,
    ErrorComponent,
    AltaTurnoComponent,
    ListadoProfesionalesComponent,
    PedirTurnoComponent,
    SacarTurnoComponent,
    ListaHabilitadosPipe,
    MisTurnosPacienteComponent,
    EstadoNoAtendidoPipe,
    EstadoAtendidoPipe,
    TurnosRecibidosComponent,
    TurnosPendientesPipe,
    TurnosAceptadoPipe,
    HomeProfesionalNoHabilitadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
