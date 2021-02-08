import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EncryptionAlgorithmOptions, HashingAlgorithmOptions, HashingAlgorithms } from '../crypto.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
})
export class SettingsPage implements OnInit, OnDestroy {
  public encryptionAlgorithmOptions: any = {
    header: 'Select encryption algorithm',
  };
  public hashingAlgorithmOptions: any = {
    header: 'Select hashing algorithm',
  };
  public hashingAlgorithms = HashingAlgorithms;
  public settingsForm: FormGroup;
  public subscriptions: Subscription[];
  public title = 'Settings';

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.settingsService.darkModeEnabled.value],
      encryptionAlgorithm: [this.settingsService.encryptionAlgorithm],
      encryptionRounds: [this.settingsService.encryptionRounds.value],
      hashingAlgorithm: [this.settingsService.encryptionAlgorithm],
      hashingRounds: [this.settingsService.hashingRounds.value],
    });

    this.subscriptions = [
      this.settingsForm.controls.encryptionAlgorithm.valueChanges.subscribe((selectedValue: EncryptionAlgorithmOptions) => {
        this.settingsService.encryptionAlgorithm.next(selectedValue);
      }),
      this.settingsForm.controls.hashingAlgorithm.valueChanges.subscribe((selectedValue: HashingAlgorithmOptions) => {
        this.settingsService.hashingAlgorithm.next(selectedValue);
      }),
      this.settingsForm.controls.darkMode.valueChanges.subscribe((selectedValue: boolean) => {
        this.settingsService.setDarkModeEnabled(selectedValue);
      }),
      this.settingsForm.controls.encryptionRounds.valueChanges.subscribe((selectedValue: number) => {
        this.settingsService.encryptionRounds.next(selectedValue);
      }),
      this.settingsForm.controls.hashingRounds.valueChanges.subscribe((selectedValue: number) => {
        this.settingsService.hashingRounds.next(selectedValue);
      }),
    ]

    // Check if dark mode preference on device changes
    this.settingsService.isDarkModePreferred()
      .addEventListener('change', (event) => {
        return this.checkDarkModeToggle(event.matches);
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  checkDarkModeToggle(shouldCheck: boolean) {
    this.settingsForm
      .get('darkMode')
      .setValue(shouldCheck);
  }
}
