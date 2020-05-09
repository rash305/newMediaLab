import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastr: ToastrService) { }
  messages: string[] = [];

  add(message: string) {
    this.toastr.error(message);
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
