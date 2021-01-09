import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encrypt',
  templateUrl: 'encrypt.page.html',
  styleUrls: ['encrypt.page.scss']
})
export class EncryptPage implements OnInit {
  encryptForm: FormGroup;
  title = 'Encrypt';
  submitted = false;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.encryptForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required]],
    });
  }

  encrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }

    console.log(this.encryptForm.value);
  }

  decrypt() {
    this.submitted = true;
    if (!this.encryptForm.valid) {
      return false;
    }

    console.log(this.encryptForm.value);
  }

  get error() {
    return this.encryptForm.controls;
  }
}
