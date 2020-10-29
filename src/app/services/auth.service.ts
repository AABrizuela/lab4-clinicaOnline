import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Profesional } from '../clases/profesional';
import { Admin } from '../clases/admin';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  logout(){
    return this.afAuth.auth.signOut()
  }

  registerUser(user){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.pass)
      .then(userData => { 
        resolve(userData)
        switch(user.perfil){
          case 'admin':
            let adminCollection = this.db.collection('admins');
            adminCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
            });
            break;
          case 'profesional':
            let profesionalCollection = this.db.collection('profesionales');
            profesionalCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
              fotoUno: user.fotoUno,
              fotoDos: user.fotoDos,
              habilitado: user.habilitado,
              nombre: user.nombre,
              apellido: user.apellido,
              atencion: user.atencion,
              especialidades: user.especialidades
            });
            break;
          case 'paciente':
            let usuariosCollection = this.db.collection('pacientes');
            console.log(user)
            usuariosCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
              fotoUno: user.fotoUno,
              fotoDos: user.fotoDos,
              nombre: user.nombre,
              apellido: user.apellido
            });
            break;
        }
      }, err => reject (err))
    });
  }

  loginEmail(email:string, pass:string, ){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => {
        resolve(userData)
       
      }, err => reject (err)).catch( e=>reject(e))
    });
  }

  sendVerificationEmail(){
    let currentUser = this.afAuth.auth.currentUser
    currentUser.sendEmailVerification()
  }

  obtenerUsuario():any{
    return this.afAuth.auth.currentUser
  }

  isEmailVerified(){
    let user = this.obtenerUsuario()
    return user.emailVerified
  }

  updateDoc(collectionName:string, data : any){
    let collection = this.db.collection(collectionName)
    switch(collectionName){
      case 'admins':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
        });
        break;
      case 'profesionales':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
          fotoUno: data.fotoUno , 
          fotoDos: data.fotoDos,
          nombre: data.nombre,
          atencion: data.atencion,
          apellido: data.apellido,
          especialidades: data.especialidades
        });
        break;
      case 'pacientes':
        collection.doc(data.email).update({
          email: data.email,
          pass: data.pass,
          perfil: data.perfil,
          fotoUno: data.fotoUno,
          nombre: data.nombre,
          apellido: data.apellido,
          fotoDos: data.fotoDos
        });
        break;

    }
  }

  getBD(collection:string){
    return new Promise((resolve, reject) => {
      this.db.collection(collection).valueChanges().subscribe(data=>resolve(data), err => reject (err))
    })
  }
}