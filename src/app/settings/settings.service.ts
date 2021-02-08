import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"
import { AlgorithmOptions, Algoritms } from "../encrypt/crypto.service";

@Injectable({providedIn: 'root'})
export class SettingsService {
  public algorithm = new BehaviorSubject<AlgorithmOptions>(Algoritms.AES);
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