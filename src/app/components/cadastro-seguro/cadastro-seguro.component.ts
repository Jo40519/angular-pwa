import { Component, OnInit } from '@angular/core';
import { Seguro } from 'src/app/models/seguro';
import { Observable } from 'rxjs';
import { MarcaCarro } from 'src/app/models/marca-carro';
import { MarcaService } from 'src/app/services/marca.service';
import { SeguroService } from 'src/app/services/seguro.service';
import { Router } from '@angular/router';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.scss']
})

export class CadastroSeguroComponent implements OnInit {

  seguro = new Seguro();
  marcasCarro$!: Observable<MarcaCarro[]>
  marcaCarros: Array<MarcaCarro> = [];
  constructor(
    private marcaCarrService: MarcaService,
    private seguroService: SeguroService,
    private pushNotificationService: PushNotificationService
  ) {}
  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarrService.getMarcas();
    this.marcaCarrService.getMarcas().subscribe((marcas: MarcaCarro[]) => {
      this.marcaCarros = marcas
      console.log(marcas)
    })
    console.log(this.marcasCarro$)
  }

  cadastrar() {
    this.seguro.id = this.seguro.placaCarro
    this.seguroService.cadastrarSeguros(this.seguro)
    this.enviarNotificacao();
  }

  enviarNotificacao() {
    this.pushNotificationService.enviar();
  }

}
