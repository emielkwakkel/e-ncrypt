import { Injectable } from "@angular/core";
import { Subject } from "rxjs"

@Injectable()
export class SettingsService {
  private darkModeEnabledSource = new Subject<boolean>();
  public darkModeEnabled$ = this.darkModeEnabledSource.asObservable();

  constructor() {
    this.setDarkModeEnabled(this.isDarkModePreferred().matches);
  }

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  setDarkModeEnabled(enableDarkMode: boolean) {
    console.log('setDarkMode', enableDarkMode);
    document.body.classList.toggle('dark', enableDarkMode);
    document.body.setAttribute('data-theme', enableDarkMode ? 'dark' : 'light');
    this.darkModeEnabledSource.next(enableDarkMode);
  }
}