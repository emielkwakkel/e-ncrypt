import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"

@Injectable()
export class SettingsService {
  public darkModeEnabled = new BehaviorSubject<boolean>(this.isDarkModePreferred().matches);
  public darkModeEnabled$ = this.darkModeEnabled.asObservable();

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  setDarkModeEnabled(enableDarkMode: boolean) {
    document.body.classList.toggle('dark', enableDarkMode);
    this.darkModeEnabled.next(enableDarkMode);
  }
}