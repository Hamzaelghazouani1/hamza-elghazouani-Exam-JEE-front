import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  user = signal<any>({});

  public saveData(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) as string;
    if(data != undefined){
      return JSON.parse(data);
    }
    return undefined;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

}
