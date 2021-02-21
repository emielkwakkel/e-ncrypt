import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"
import {
  EncryptionAlgorithmOptions,
  EncryptionAlgorithms,
  HashingAlgorithms,
  HashingAlgorithmOptions,
} from "../crypto.service";

@Injectable({providedIn: 'root'})
export class SettingsService {
  public encryptionAlgorithm = new BehaviorSubject<EncryptionAlgorithmOptions>(EncryptionAlgorithms.AES);
  public encryptionAlgorithm$ = this.encryptionAlgorithm.asObservable();
  public darkModeEnabled = new BehaviorSubject<boolean>(this.isDarkModePreferred().matches);
  public darkModeEnabled$ = this.darkModeEnabled.asObservable();
  public hashingAlgorithm = new BehaviorSubject<HashingAlgorithmOptions>(HashingAlgorithms.SHA512);
  public hashingAlgorithm$ = this.hashingAlgorithm.asObservable();
  public encryptionRounds = new BehaviorSubject<number>(1);
  public encryptionRounds$ = this.encryptionRounds.asObservable();
  public hashingRounds = new BehaviorSubject<number>(1);
  public hashingRounds$ = this.hashingRounds.asObservable();

  isDarkModePreferred(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  setDarkModeEnabled(enableDarkMode: boolean) {
    document.body.classList.toggle('dark', enableDarkMode);
    this.darkModeEnabled.next(enableDarkMode);
  }
}