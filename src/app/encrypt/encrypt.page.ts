import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: 'encrypt.page.html',
  styleUrls: ['encrypt.page.scss']
})
export class EncryptPage implements OnInit {
  public encryptForm: FormGroup;
  public title = 'Encrypt';
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit() {
    this.encryptForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
    });
  }

  encrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }
    console.log(this.encryptForm.controls.content.value, this.encryptForm.controls.key.value);

    this.encryptForm.controls.content.setValue(
      this.cryptoService.encrypt(
        this.encryptForm.controls.content.value,
        this.encryptForm.controls.key.value
      )
    );
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
