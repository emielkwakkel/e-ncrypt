import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  public settingsForm: FormGroup;
  public title = 'Settings';

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.settingsService.darkModeEnabled.value],
    });

    this.settingsForm.get('darkMode').valueChanges.subscribe((selectedValue: boolean) => {
      this.settingsService.setDarkModeEnabled(selectedValue);
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
