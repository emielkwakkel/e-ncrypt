import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { SettingsService } from '../settings/settings.service';
import { CryptoService } from '../crypto.service';
const { Share } = Plugins;

@Component({
  selector: 'app-encrypt',
  templateUrl: 'encrypt.page.html',
  styleUrls: ['encrypt.page.scss']
})
export class EncryptPage implements OnInit, OnDestroy {
  public encryptForm: FormGroup;
  public title = 'Encrypt';
  public submitted = false;
  private subscriptions: Subscription[];
  public platform: 'ios' | 'android' | 'electron' | 'web';

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
    private toastController: ToastController,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.encryptForm = this.formBuilder.group({
      type: ['encrypt'],
      key: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required]],
    });
    
    this.appService.device.then(({ platform }) => {
      this.platform = platform;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  encrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }

    this.encryptForm.controls.type.setValue('decrypt');
    this.encryptForm.controls.content.setValue(
      this.cryptoService.encrypt(
        this.encryptForm.controls.content.value,
        this.encryptForm.controls.key.value,
        this.settingsService.algorithm.value,
        this.settingsService.rounds.value,
      )
    );
  }

  decrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }
    
    this.encryptForm.controls.type.setValue('encrypt');
    this.encryptForm.controls.content.setValue(
      this.cryptoService.decrypt(
        this.encryptForm.controls.content.value,
        this.encryptForm.controls.key.value,
        this.settingsService.algorithm.value,
        this.settingsService.rounds.value,
      )
    );
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

  hasErrors(formControlName: string) {
    return this.encryptForm.controls[formControlName].touched && !!this.encryptForm.controls[formControlName].errors;
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
    });

    toast.present();
  }
}
