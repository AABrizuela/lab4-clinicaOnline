import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
import { HomeProfesionalNoHabilitadoComponent } from './components/home/home-profesional-no-habilitado/home-profesional-no-habilitado.component';
import { CompleteTheWordComponent } from './components/captcha/complete-the-word/complete-the-word.component';
import { PerfilComponent } from './components/perfiles/perfil/perfil.component';
import { PerfilPacienteComponent } from './components/perfiles/perfil-paciente/perfil-paciente.component';
import { PerfilProfesionalComponent } from './components/perfiles/perfil-profesional/perfil-profesional.component';
import { PerfilAdminComponent } from './components/perfiles/perfil-admin/perfil-admin.component';
import { AtenderComponent } from './components/atencion/atender/atender.component';
import { TurnosDeHoyPipe } from './pipes/turnos-de-hoy.pipe';
import { EncuestaComponent } from './components/atencion/encuesta/encuesta.component';
import { VerResenaPipe } from './pipes/ver-resena.pipe';
import { BusqAdminComponent } from './components/busqueda/busq-admin/busq-admin.component';
import { BusquedaInformacionComponent } from './components/busqueda/busqueda-informacion/busqueda-informacion.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { QuinceDiasPipe } from './pipes/quince-dias.pipe';

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
    HomeProfesionalNoHabilitadoComponent,
    CompleteTheWordComponent,
    PerfilComponent,
    PerfilPacienteComponent,
    PerfilProfesionalComponent,
    PerfilAdminComponent,
    AtenderComponent,
    TurnosDeHoyPipe,
    EncuestaComponent,
    VerResenaPipe,
    BusqAdminComponent,
    BusquedaInformacionComponent,
    GraficosComponent,
    QuinceDiasPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
