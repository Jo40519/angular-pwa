import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private swPush: SwPush
  ) {
    this.swPush.notificationClicks.subscribe((result) => {
      console.log('Clicou na notificação', result)
      if(result.action === 'listar'){
        this.router.navigate([result.action])

      }
    })
  }

  adicionaPusherSubscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    }).then(sub => {
      console.log('Usuário inscrito', sub)

      this.http.post(environment.API+ '/api/notificacao', sub).subscribe(() => {
        console.log('Inscrição adicionada com sucesso', sub),
          (err: any) => console.log('Erro ao adicionar a indcirção', err)
      })
    }).catch(err => {console.log('Erro ao adicionar a inscrição', err)})
  }

  enviar() {
    this.http.post(environment.API + '/api/notificacao/enviar', null).subscribe(() => {
      console.log('Notificação enviada com sucesso!'),
      (err: any) => console.log('Erro ao enviar a notificação')
    })
  }
}
