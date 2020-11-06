import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.scss']
})
export class PerfilPacienteComponent implements OnInit {

  @Input() input_perfil_paciente: string;
  user;

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario();
    this.service.getBDByDoc('pacientes', this.user.email).then(data => {this.user = data; console.log(this.user); });
  }

  evaluarFoto(foto: string){
    return foto == 'default' ? '../../../../assets/usuDefault.png' : foto;
  }

}
