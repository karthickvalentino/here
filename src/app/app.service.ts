import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private storage = sessionStorage;

  constructor() { }

  getUserType() {
    return this.storage.getItem('userType');
  }

  setUserTye(type?: string): void {
    if (type === null) {
      this.storage.removeItem('userType');
      return;
    }
    this.storage.setItem('userType', type);
  }
}
