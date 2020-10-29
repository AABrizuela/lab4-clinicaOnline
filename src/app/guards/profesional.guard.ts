import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map, tap } from 'rxjs/operators';
import { AngularFirestore} from '@angular/fire/firestore'
import { Profesional } from '../clases/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalGuard implements CanActivate {
  constructor(private afsAuth:AngularFireAuth, private router:Router, private db : AngularFirestore){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if(!auth){
          this.router.navigate(['/error'])
        }
        else{
          let promise = this.db.collection('profesionales', ref=>{return ref.where('email', '==', this.afsAuth.auth.currentUser.email)})
          let observable = promise.valueChanges();
          observable.subscribe((listado:Profesional[])=>{
            if(!listado[0].habilitado){
              this.router.navigate(['/home/profesional/no_habilitado'])
            }
          })
        }
      }));
  } 
  
}
