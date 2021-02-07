import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { AppService } from '../app.service';
import { CryptoService } from './crypto.service';
const { Share } = Plugins;

@Component({
  selector: 'app-encrypt',
  templateUrl: 'encrypt.page.html',
  styleUrls: ['encrypt.page.scss']
})
export class EncryptPage implements OnInit {
  public encryptForm: FormGroup;
  public title = 'Encrypt';
  public submitted = false;
  public platform: 'ios' | 'android' | 'electron' | 'web';

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit() {
    this.encryptForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
    });
    this.appService.device.then(({ platform }) => {
      this.platform = platform;
    })
  }

  encrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }

    this.encryptForm.controls.content.setValue(
      this.cryptoService.encrypt(
        this.encryptForm.controls.content.value,
        this.encryptForm.controls.key.value
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
    await navigator.clipboard.writeText(text);
  }

  decrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }

    this.encryptForm.controls.content.setValue(
      this.cryptoService.decrypt(
        this.encryptForm.controls.content.value,
        this.encryptForm.controls.key.value
      )
    );
  }

  get error() {
    return this.encryptForm.controls;
  }
}
