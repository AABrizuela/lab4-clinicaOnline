import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db:AngularFirestore) { }

  setTurno(profesional:string, paciente:string, data:any)
  {
    this.getTurnoProfesional(profesional).then((datos:any) => {
      
      datos.turnos.push(data);
      this.updateTurnos('turnos-profesionales', profesional,datos);
    })

    this.getTurnosPaciente(paciente).then((datos:any) => {
      datos.turnos.push(data);
      this.updateTurnos('turnos-pacientes', paciente,datos);
    })
  }

  updateTurnos(collection, doc, data)
  {
    this.db.collection(collection).doc(doc).update(data);
  } 
 getTurnosPacienteTodos()
  {
    return new Promise((resolve, reject) => {
      this.db.collection("turnos-pacientes").valueChanges().subscribe((datos) => {
        resolve(datos);
      }, error => reject(error));
    })
  }

  getTurnosPaciente(email : string)
  {
    return new Promise((resolve, reject) => {
      this.db.collection("turnos-pacientes").doc(email).valueChanges()
      .subscribe(datos => resolve(datos), error => reject(error));
    });
  }

  getTurnosProfesionalTodos()
  {
    return new Promise((resolve, reject) => {
      this.db.collection("turnos-profesionales").valueChanges().subscribe((datos) => {
        resolve(datos);
      }, error => reject(error));
    })
  }

  getTurnoProfesional(email: string)
  {
    return new Promise((resolve, reject) => {
      this.db.collection("turnos-profesionales").doc(email).valueChanges()
      .subscribe(datos => resolve(datos), error => reject(error));
    });
  } 

  altaProfesional(email){
    this.db.collection('turnos-profesionales').doc(email).set({turnos:[]})
  }
}
