import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import {storage} from 'firebase'
import { AttachSession } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private db : AngularFirestore) { }

  subirEspecialidadesBD(especialidades, profesional){
    let collection = this.db.collection('especialidad')
    let obs = collection.valueChanges().subscribe((datos:any) => {
      for (let esp of especialidades) {
        let flag = false
        for (let espBD of datos) {
          if(esp == espBD.nombre){
            flag = true;
            break;
          }
        }
        if(!flag){
          collection.doc(esp).set({nombre:esp, profesionales: [profesional]})
          let subsEsp = collection.doc('especialidades').valueChanges().subscribe((lista:any)=>{
            lista.nombre.push(esp)
            collection.doc('especialidades').update(lista)
            subsEsp.unsubscribe()
          })
        }
        else{
          let obsEsps = collection.doc(esp).valueChanges().subscribe((datitos:any)=>{
            datitos.profesionales.push(profesional)
            collection.doc(esp).update(datitos)
            obsEsps.unsubscribe()
          })
        }
      }

      obs.unsubscribe()
    })
  }

  subirEspecialidadBD(especialidad, profesional){
    let collection = this.db.collection('especialidad')
    let obs = collection.valueChanges().subscribe((datos:any) => {
    let flag = false
      for (let espBD of datos) {
        if(especialidad == espBD.nombre){
          flag = true;
          break;
        }
      }
      if(!flag){
        collection.doc(especialidad).set({nombre:especialidad, profesionales: [profesional]})
        let subsEsp = collection.doc('especialidades').valueChanges().subscribe((lista:any)=>{
          lista.nombre.push(especialidad)
          collection.doc('especialidades').update(lista)
          subsEsp.unsubscribe()
        })

      }
      else{
        let obsEsps = collection.doc(especialidad).valueChanges().subscribe((datitos:any)=>{
          datitos.profesionales.push(profesional) 
          collection.doc(especialidad).update(datitos)
          obsEsps.unsubscribe()
        })
      }
      obs.unsubscribe()
    })
  }

  borrarEspecialidadBD(especialidad, profesional){
    let collection = this.db.collection('especialidad').doc(especialidad)
    let obs = collection.valueChanges().subscribe((datos:any)=>{
        let index = 0 
        for(let prof of datos.profesionales){
          if(prof.email == profesional.email){
            datos.profesionales.splice(index, 1)
            collection.update(datos) 
            let indexDos = profesional.especialidades.indexOf(especialidad)
            profesional.especialidades.splice(indexDos,1)
            this.db.collection('profesionales').doc(profesional.email).update(profesional)
            this.updateEnTodosLados(profesional) 
          }
          index++
        }

        obs.unsubscribe()
    })
  }

  updateEnTodosLados(profesional){
    this.updateStorage(profesional)
    this.updateEsp(profesional)
    this.updateSemana(profesional)
  }

  updateEsp(profesional){
    for (let esp of profesional.especialidades) {
      let collection = this.db.collection('especialidad').doc(esp)
      let obs = collection.valueChanges().subscribe((datos:any)=>{
      let index
        for(let prof of datos.profesionales){
          if(prof.email == profesional.email){
            index = datos.profesionales.indexOf(prof)
            datos.profesionales[index] = profesional
            break;
          }
        }
        collection.update(datos)
        obs.unsubscribe()
      })
    }
  }

  updateSemana(profesional){
    if(profesional.atencion != undefined && profesional.atencion.length > 0){
      for (let atencion of profesional.atencion) {
        let collection = this.db.collection('semana').doc(atencion.dia)
        let obs = collection.valueChanges().subscribe((datos:any)=>{
          let index
          for(let prof of datos.profesionales){
            if(prof.email == profesional.email){
              index = datos.profesionales.indexOf(prof)
              datos.profesionales[index] = profesional
              break;
            }
          }
          collection.update(datos)
          obs.unsubscribe()
        })
      }
    }
    
  }

  updateStorage(profesional){
    if(profesional.fotoUno != 'default'){
      let refUno :any= storage().ref(`profesionales/${profesional.email}-uno`)      
      let metaDataUno = {'customMetadata': {propietario: JSON.stringify(profesional)}}
      refUno.updateMetadata(metaDataUno)
    }
    if(profesional.fotoDos != 'default'){
      let refDos :any= storage().ref(`profesionales/${profesional.email}-dos`)      
      let metaDataDos = {'customMetadata': {propietario: JSON.stringify(profesional)}}
      refDos.updateMetadata(metaDataDos)
    }
  }

}
