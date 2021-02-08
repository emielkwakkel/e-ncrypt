import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"
import { AlgorithmOptions, Algorithms } from "../crypto.service";

@Injectable({providedIn: 'root'})
export class SettingsService {
  public algorithm = new BehaviorSubject<AlgorithmOptions>(Algorithms.AES);
  public algorithm$ = this.algorithm.asObservable();
  public darkModeEnabled = new BehaviorSubject<boolean>(this.isDarkModePreferred().matches);
  public darkModeEnabled$ = this.darkModeEnabled.asObservable();
  public rounds = new BehaviorSubject<number>(5);
  public rounds$ = this.rounds.asObservable();

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  setDarkModeEnabled(enableDarkMode: boolean) {
    document.body.classList.toggle('dark', enableDarkMode);
    this.darkModeEnabled.next(enableDarkMode);
  }
}