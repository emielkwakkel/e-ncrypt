import { Injectable } from "@angular/core";
import { Plugins } from '@capacitor/core';
import { ToastController } from "@ionic/angular";
const { Device, Share } = Plugins;

export type PlatformOptions = 'ios' | 'android' | 'electron' | 'web';

@Injectable()
export class AppService {
  public device = Device.getInfo();
  public platform: PlatformOptions;

  constructor(
    private toastController: ToastController,
  ) {
    this.device.then(({ platform }) => {
      this.platform = platform;
    });
  }

  async copyOrShare(text: string) {
    (this.platform !== 'web')
      ? await this.share(text)
      : await this.copy(text);
  }

  async share(text: string) {
    await Share.share({ text });
  }

  async copy(text: string) {
    await navigator.clipboard.writeText(text)
      .then(() => this.presentToast('Copied content to the clipboard!', 1500));
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
    });

    toast.present();
  }
}