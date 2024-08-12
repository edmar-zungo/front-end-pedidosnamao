import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MesaModel } from './mesa.model';

@Injectable({
  providedIn: 'root',
})
export class MesaService {

  urlApi = `${environment.apiUrl}/mesas`;
  
  mesas = signal<MesaModel[]>([]); 

  constructor(private http: HttpClient){}

  getMesas(){
    this.http.get<MesaModel[]>(this.urlApi).subscribe(mesasResult => {
      this.mesas.set(mesasResult);
    });
  }

  saveMesa(mesa: MesaModel): Observable<MesaModel>{
    return this.http.post<MesaModel>(this.urlApi, mesa);
  }

  getOneMesa(mesaId: string): Observable<MesaModel>{
    return this.http.get<MesaModel>(`${this.urlApi}/${mesaId}`);
  }

  updateMesa(mesa: MesaModel): Observable<MesaModel>{
    return this.http.put<MesaModel>(`${this.urlApi}/${mesa.id}`, mesa);
  }
}
