import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EncryptionAlgorithmOptions, HashingAlgorithmOptions, HashingAlgorithms } from '../crypto.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  public hashingAlgorithms = HashingAlgorithms;
  public settingsForm: FormGroup;
  public title = 'Settings';
  public encryptionAlgorithmOptions: any = {
    header: 'Select encryption algorythm',
  };
  public hashingAlgorithmOptions: any = {
    header: 'Select hashing algorythm',
  };

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.settingsService.darkModeEnabled.value],
      encryptionAlgorithm: [this.settingsService.encryptionAlgorithm],
      encryptionRounds: [this.settingsService.encryptionRounds.value],
      hashingAlgorithm: [this.settingsService.encryptionAlgorithm],
      hashingRounds: [this.settingsService.hashingRounds.value],
    });
    this.settingsForm.controls.encryptionAlgorithm.valueChanges.subscribe((selectedValue: EncryptionAlgorithmOptions) => {
      this.settingsService.encryptionAlgorithm.next(selectedValue);
    });
    this.settingsForm.controls.hashingAlgorithm.valueChanges.subscribe((selectedValue: HashingAlgorithmOptions) => {
      this.settingsService.hashingAlgorithm.next(selectedValue);
    });
    this.settingsForm.get('darkMode').valueChanges.subscribe((selectedValue: boolean) => {
      this.settingsService.setDarkModeEnabled(selectedValue);
    });
    this.settingsForm.get('encryptionRounds').valueChanges.subscribe((selectedValue: number) => {
      this.settingsService.encryptionRounds.next(selectedValue);
    });
    this.settingsForm.get('hashingRounds').valueChanges.subscribe((selectedValue: number) => {
      this.settingsService.hashingRounds.next(selectedValue);
    });

    // Check if dark mode preference on device changes
    this.settingsService.isDarkModePreferred()
      .addEventListener('change', (event) => {
        return this.checkDarkModeToggle(event.matches);
      });
  }

  checkDarkModeToggle(shouldCheck: boolean) {
    this.settingsForm
      .get('darkMode')
      .setValue(shouldCheck);
  }
}
