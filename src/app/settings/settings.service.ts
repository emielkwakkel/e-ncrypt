import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"
import { AlgorithmOptions, Algoritms } from "../encrypt/crypto.service";

@Injectable()
export class SettingsService {
  private algorithmSource = new BehaviorSubject<AlgorithmOptions>(Algoritms.AES);
  public algorithm$ = this.algorithmSource.asObservable();
  public darkModeEnabled = new BehaviorSubject<boolean>(this.isDarkModePreferred().matches);
  public darkModeEnabled$ = this.darkModeEnabled.asObservable();
  public rounds = new BehaviorSubject<number>(1);
  public rounds$ = this.rounds.asObservable();

  get algorithm() {
    return this.algorithmSource.value;
  }

  set algorithm(algorithm: AlgorithmOptions) {
    this.algorithmSource.next(algorithm);
  }

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  setDarkModeEnabled(enableDarkMode: boolean) {
    document.body.classList.toggle('dark', enableDarkMode);
    this.darkModeEnabled.next(enableDarkMode);
  }
}