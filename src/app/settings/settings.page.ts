import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public settingsForm: FormGroup;
  public title = 'Settings';
  public darkModeEnabled = this.isDarkModePreferred().matches;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.darkModeEnabled]
    });

    this.isDarkModePreferred()
      .addEventListener('change', (event) => {
        return this.checkToggle(event.matches);
      });
  }

  checkToggle(shouldCheck: boolean) {
    this.settingsForm.get('darkMode').setValue(shouldCheck);
  }

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }
}
