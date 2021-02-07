import { Injectable } from "@angular/core";
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Injectable()
export class AppService {
  public device = Device.getInfo();
}