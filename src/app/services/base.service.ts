import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Seguro as T } from '../models/seguro';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends {id: string}> {
  private db!: Dexie;
  private table!: Dexie.Table<T, any>;
  protected http!: HttpClient;
  protected router!: Router;
  protected onlineOfflineService!: OnlineOfflineService;
  constructor(protected injector: Injector, protected nomeTabela: string, protected urlApi: string) {
    this.http = this.injector.get(HttpClient);
    this.router = this.injector.get(Router);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    this.ouvirStatusConexao();
    this.iniciarIndexedDB();
  }

  listarSeguros(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.urlApi);
  }


  private salvarApi(seguro: T) {
    return this.http
      .post(this.urlApi, seguro)
      .subscribe(() => {
        alert('Seguro cadastrado com sucesso');
        this.router.navigate(['listar-seguros']);
      });
  }

  cadastrarSeguros(seguro: T) {
    if (this.onlineOfflineService.isOnline) {
      this.salvarApi(seguro);
    } else {
      this.salvarIdexedDB(seguro);
    }
  }

  ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao.subscribe((online) => {
      online ? void this.enviarIndexedDbParaApi() : console.log('estou off');
    });
  }

  async salvarIdexedDB(tabela: T) {
    try {
      await this.table.add(tabela);
      const todostabelas: Array<T> = await this.table.toArray();
      console.log('tabelaS SALVOS NO INDEXEDBD', todostabelas);
    } catch (error) {
      console.log('DEU ERRO', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todostabelas: Array<T> = await this.table.toArray();
    for (const tabela of todostabelas) {
      this.salvarApi(tabela);
      await this.table.delete(tabela.id);
      console.log(`tabela com o id ${tabela.id} foi excluido com sucesso`);
    }
  }

  private iniciarIndexedDB() {
    this.db = new Dexie('db-tabelas');
    this.db.version(1).stores({
      [this.nomeTabela]: 'id',
    });
    this.table = this.db.table(this.nomeTabela);
  }
}
