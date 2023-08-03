import { Injectable, Injector } from '@angular/core';
import { Seguro } from '../models/seguro';
import { BaseService } from './base.service';
import { PushNotificationService } from './push-notification.service';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends BaseService<Seguro> {

  constructor(protected override injector: Injector, private pushNotificationService: PushNotificationService) {
    super(injector, 'seguros', 'http://localhost:9000/api/seguros');
  }

 
}
