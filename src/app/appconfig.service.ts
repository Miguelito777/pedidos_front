import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {
  
  constructor() { }
  
  //DESARROLLO
  restApiServiceBaseUri = 'http://localhost:8000/PEDIDOS/' // REST Api 
  //restOAUTH = 'http://localhost:8080/OAUTH_DMZ/webapi/' //oauth
  //restRRHH = 'http://wsdesacit.oj.gob.gt:8080/rrhh/' //rrhh prod
  //reportesOAUTH = 'http://wsdesacit.oj.gob.gt:8080/OAUTH2/webapi/Reportes/generarReporteDirecto'
  //sistemaId = 29  //id sistema  oauth  EMPLEO2 16
  //sistemaIdOAUTH = 2  //id sistema  oauth
  //sistemaIdRRHH = 33 
  

  //PRUEBAS
  //restApiServiceBaseUri= 'https://serene-basin-17994.herokuapp.com/PEDIDOS/' // REST Api
  // restOAUTH = 'http://wsdesacit.oj.gob.gt:8080/OAUTH_DMZ/webapi/' //oauth
  // restRRHH = 'http://wsdesacit.oj.gob.gt:8080/rrhh/' //rrhh prod
  // reportesOAUTH = 'http://wsdesacit.oj.gob.gt:8080/OAUTH2/webapi/Reportes/generarReporteDirecto'
  // sistemaId = 29  //id sistema  oauth  EMPLEO2 16 
  // sistemaIdOAUTH = 2  //id sistema  oauth
  // sistemaIdRRHH = 33

  SistemaOAUTH='OAUTH'
  Sistema= 'PEDIDOS'
}
