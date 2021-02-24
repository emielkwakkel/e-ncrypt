import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { SettingsService } from '../settings/settings.service';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: 'encrypt.page.html',
  styleUrls: ['encrypt.page.css'],
})
export class EncryptPage implements OnInit {
  public encryptForm: FormGroup;
  public title = 'Encryption';
  public submitted = false;

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
    public settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.encryptForm = this.formBuilder.group({
      type: ['encrypt'],
      key: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required]],
    });
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
        this.settingsService.encryptionAlgorithm.value,
        this.settingsService.encryptionRounds.value,
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
        this.settingsService.encryptionAlgorithm.value,
        this.settingsService.encryptionRounds.value,
      )
    );
  }

  clear() {
    this.encryptForm.controls.content.setValue('');
    this.encryptForm.controls.content.markAsUntouched();
  }

  async copyOrShare(text: string) {
    this.appService.copyOrShare(text);
  }

  hasErrors(formControlName: string) {
    return this.encryptForm.controls[formControlName].touched && !!this.encryptForm.controls[formControlName].errors;
  }
}
