import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/seguro';
import { SeguroService } from 'src/app/services/seguro.service';

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrls: ['./listar-seguros.component.scss']
})
export class ListarSegurosComponent implements OnInit {
  seguros$!: Observable<Array<Seguro>>
  constructor(private seguroService: SeguroService) {}

  ngOnInit(): void {
    this.seguros$ = this.seguroService.listarSeguros();
  }

}
