import { Injectable } from '@angular/core';
import { Http, Headers, BrowserXhr } from '@angular/http';
import { environment } from '../../../environments/environment';
import { MessageAlertsService } from '../services/messageAlertsService.service';

declare var Promise: any;

@Injectable()
export class Services extends BrowserXhr {

  constructor(
    private http: Http
  ) {
    super();
  }

  public build(): any {
    let xhr = super.build();
    xhr.responseType = "blob";
    return <any>(xhr);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    return headers;
  }

  get(schema: string): Promise<any[]> {

    let headers = this.getHeaders();

    return Promise.resolve(this.http.get(environment.urlApi + schema, { headers: headers })
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text())
      })
      .catch((res) => {
        this.msgRetorno(schema, res, 'get');
        return [];
      }));
  }

  post(schema: string, body: any, files: any): Promise<any[]> {
    
    let headers = this.getHeaders();

    return Promise.resolve(this.http.post(environment.urlApi + schema, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'post');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        console.log(res);
        this.msgRetorno(schema, res, 'post');
        return [];
      })
    );
  }

  put(schema: string, body: any, id: any): Promise<any[]> {
    let headers = this.getHeaders();
    return Promise.resolve(this.http.post(environment.urlApi + schema + "/" + id, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'put');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        console.log(res);
        this.msgRetorno(schema, res, 'put');
        return [];
      })
    );
  }

  delete(schema: string, id: any, body: any): Promise<any[]> {
    
    let headers = this.getHeaders();

    return Promise.resolve(this.http.post(environment.urlApi + schema + '/' + id, body, { headers: headers })
      .toPromise()
      .then((res) => {
        this.msgRetorno(schema, res, 'delete');
        return JSON.parse(res.text())
      })
      .catch((res) => {
        console.log(res);
        this.msgRetorno(schema, res, 'delete');
        return [];
      })
    );
  }

  msgRetorno(schema: string, res: any, method: string): any {
    var str: string;
    var typeMessage: string;

    if (res.status == 200) {
      typeMessage = 'success'
      switch (method) {
        case 'post':
          str = 'Cadastro realizado com sucesso'
          break;
        case 'put':
          str = 'Atualização realizada com sucesso'
          break;
        case 'delete':
          str = 'Exclusão realizada com sucesso'
          break;
        case 'validar':
          str = 'Validação realizada com sucesso'
          break;  
      }
    } else {
      switch (res.status) {
        case 400:
          typeMessage = 'warning'
          str = JSON.parse(res.text()).strMessage.toLocaleUpperCase()
          break;
        case 401:
          typeMessage = 'error'
          str = 'Operação não autorizada'
          break;
        case 403:
          typeMessage = 'error'
          str = 'Acesso negado'
          break;
        case 404:
          typeMessage = 'warning'
          str = 'Rota de aplicação não disponível'
          break;
        case 406:
          typeMessage = 'warning'
          str = 'Dados não validos'
          break;
        case 409:
          typeMessage = 'warning'
          str = res._body
          break;
        case 500:
          typeMessage = 'warning'
          str = 'Erro interno da aplicação'
          break;
        default:
          typeMessage = 'warning'
          str = 'Problema ao carregar, contate o nosso suporte. ' + schema.toLocaleUpperCase();
          break;

      }
    }
    MessageAlertsService.customMessage('', str, typeMessage);
  }
}