import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {
  // private darkModeEnabled = new Subject<boolean>();
  private _darkModeEnabled = this.isDarkModePreferred().matches;

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  get darkModeEnabled(): boolean {
    return this._darkModeEnabled;
  }

  set darkModeEnabled(enableDarkMode: boolean) {
    console.log('setting', enableDarkMode);
    this._darkModeEnabled = enableDarkMode;
  }
}