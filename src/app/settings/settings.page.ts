import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlgorithmOptions } from '../encrypt/crypto.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  public settingsForm: FormGroup;
  public title = 'Settings';
  algorithmActionSheetOptions: any = {
    header: 'Select encryption algorythm',
  };

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      algorithm: [this.settingsService.algorithm],
      rounds: [this.settingsService.rounds.value],
      darkMode: [this.settingsService.darkModeEnabled.value],
    });
    this.settingsForm.get('algorithm').valueChanges.subscribe((selectedValue: AlgorithmOptions) => {
      console.log('new on settings page', selectedValue);
      this.settingsService.algorithm = selectedValue;
      console.log('new val', this.settingsService.algorithm);
    });
    this.settingsForm.get('darkMode').valueChanges.subscribe((selectedValue: boolean) => {
      this.settingsService.setDarkModeEnabled(selectedValue);
    });
    this.settingsForm.get('rounds').valueChanges.subscribe((selectedValue: number) => {
      this.settingsService.rounds.next(selectedValue);
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
