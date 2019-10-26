import { Routes } from '@angular/router';
import { ClientesgComponent } from './clientesg/clientesg.component';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppconfigService } from '../appconfig.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class CatalogoService {
  
    constructor(
      private http: HttpClient,
      private appSettings:AppconfigService
    ) { }
    private getURL(urlServer,Servicio){
      return urlServer+Servicio;
    }
    getClientes(): Observable<any>{
      return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'clientes'))
      .pipe(
        catchError(this.handleError('clientes', undefined))
      ); 
    }  
    setPedido(data): Observable<any>{
      return this.http.post<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'pedidos'),data)
      .pipe(
        catchError(this.handleError('pedidos', undefined))
      );
    }  
    setCliente(data): Observable<any>{
      return this.http.post<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'clientes'),data)
      .pipe(
        catchError(this.handleError('clientes', undefined))
      );
    }  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        //console.error(error);
        //new recursosVarios().showNotification('top','right','Session ha expirada, ingrese al sistema de nuevo',4)
        //this.router.navigate(['/pages/login']);
        return of(result as T);
      };
    }
  }
  