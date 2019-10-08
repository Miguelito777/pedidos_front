import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppconfigService } from '../appconfig.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(
    private http: HttpClient,
    private appSettings:AppconfigService
  ) { }
  private getURL(urlServer,Servicio){
    return urlServer+Servicio;
  }
  getCatalogo(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'catalogo/'))
    .pipe(
      catchError(this.handleError('catalogo', undefined))
    );
  }  
  getClientes(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'catalogo/clientes'))
    .pipe(
      catchError(this.handleError('catalogo', undefined))
    );
  }  
  getProductos(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'catalogo/productos'))
    .pipe(
      catchError(this.handleError('catalogo', undefined))
    );
  } 
  getDirecciones(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'catalogo/direcciones'))
    .pipe(
      catchError(this.handleError('catalogo', undefined))
    );
  }  
  getMadres(): Observable<any>{
    return this.http.get<any>('https://hidden-shore-94764.herokuapp.com/api/madres')
    .pipe(
      catchError(this.handleError('catalogo', undefined))
    );
  }  
  getPedidos(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'pedidos/ventas'))
    .pipe(
      catchError(this.handleError('pedidos', undefined))
    );
  } 
  getPedidoPDF(): Observable<any>{
    return this.http.get<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'pedidos/pedidoPDF'))
    .pipe(
      catchError(this.handleError('pedidos/pedidoPDF', undefined))
    );
  } 
  setPedido(data): Observable<any>{
    return this.http.post<any>(this.getURL(this.appSettings.restApiServiceBaseUri,'pedidos'),data)
    .pipe(
      catchError(this.handleError('pedidos', undefined))
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
