import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { CryptoService } from '../crypto.service';
import { AppService, PlatformOptions } from '../app.service';

@Component({
  selector: 'app-hash',
  templateUrl: 'hash.page.html',
})
export class HashPage implements OnInit {
  public hashForm: FormGroup;
  public title = 'Hashing';
  public submitted = false;
  public platform: PlatformOptions;

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
    public settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.hashForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  hash() {
    this.submitted = true;
    if (!this.hashForm.valid) {
      return false;
    }

    this.hashForm.controls.content.setValue(
      this.cryptoService.hash(
        this.hashForm.controls.content.value,
        this.settingsService.hashingAlgorithm.value,
        this.settingsService.hashingRounds.value,
      )
    );
  }

  hasErrors(formControlName: string) {
    return this.hashForm.controls[formControlName].touched && !!this.hashForm.controls[formControlName].errors;
  }

  async copyOrShare(text: string) {
    this.appService.copyOrShare(text);
  }
}
