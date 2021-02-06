import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartialObserver } from 'rxjs';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public darkModeEnabled = this.settingsService.darkModeEnabled;
  public settingsForm: FormGroup;
  public title = 'Settings';

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.darkModeEnabled],
    });

    this.settingsForm.get('darkMode').valueChanges.subscribe((selectedValue: boolean) => {
      this.settingsService.darkModeEnabled = selectedValue;
    })

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
