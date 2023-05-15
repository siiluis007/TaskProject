import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Task Client';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
