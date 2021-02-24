import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EncryptionAlgorithmOptions, HashingAlgorithmOptions, HashingAlgorithms } from '../crypto.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
})
export class SettingsPage implements OnInit, OnDestroy {
  public encryptionAlgorithmOptions: any = {
    header: 'Select encryption algorithm',
  };
  public hashingAlgorithmOptions: any = {
    header: 'Select hashing algorithm',
  };
  public hashingAlgorithms = HashingAlgorithms;
  public settingsForm: FormGroup;
  public subscriptions: Subscription[];
  public title = 'Settings';

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      darkMode: [this.settingsService.darkModeEnabled.value],
      encryptionAlgorithm: [this.settingsService.encryptionAlgorithm],
      encryptionRounds: [this.settingsService.encryptionRounds.value],
      hashingAlgorithm: [this.settingsService.encryptionAlgorithm],
      hashingRounds: [this.settingsService.hashingRounds.value],
    });

    this.subscriptions = this.setSubscriptions();
    this.isDarkModePreferred();
  }

  ngOnDestroy() {
    this.unsubscribeSubscriptions(this.subscriptions);
  }

  setSubscriptions(): Subscription[] {
    return [
      // Update service when value changes
      this.settingsForm.controls.encryptionAlgorithm.valueChanges.subscribe((selectedValue: EncryptionAlgorithmOptions) => {
        this.settingsService.encryptionAlgorithm.next(selectedValue);
      }),
      this.settingsForm.controls.hashingAlgorithm.valueChanges.subscribe((selectedValue: HashingAlgorithmOptions) => {
        this.settingsService.hashingAlgorithm.next(selectedValue);
      }),
      this.settingsForm.controls.darkMode.valueChanges.subscribe((selectedValue: boolean) => {
        this.settingsService.setDarkModeEnabled(selectedValue);
      }),
      this.settingsForm.controls.encryptionRounds.valueChanges.subscribe((selectedValue: number) => {
        this.settingsService.encryptionRounds.next(selectedValue);
      }),
      this.settingsForm.controls.hashingRounds.valueChanges.subscribe((selectedValue: number) => {
        this.settingsService.hashingRounds.next(selectedValue);
      }),
      // Update form when service changes
      this.settingsService.encryptionAlgorithm$.subscribe((selectedValue: EncryptionAlgorithmOptions) => {
        this.settingsForm.controls.encryptionAlgorithm.setValue(selectedValue, { emitEvent: false });
      }),
      this.settingsService.hashingAlgorithm$.subscribe((selectedValue: HashingAlgorithmOptions) => {
        this.settingsForm.controls.hashingAlgorithm.setValue(selectedValue, { emitEvent: false });
      }),
      // TODO: Add Darkmode too
      this.settingsService.encryptionRounds$.subscribe((selectedValue: number) => {
        this.settingsForm.controls.encryptionRounds.setValue(selectedValue, { emitEvent: false });
      }),
      this.settingsService.hashingRounds$.subscribe((selectedValue: number) => {
        this.settingsForm.controls.hashingRounds.setValue(selectedValue, { emitEvent: false });
      }),
    ]
  }

  /**
   * Unsubscribes each subscription
   * @param subscriptions Subscription[] Array of subscriptions
   */
  unsubscribeSubscriptions(subscriptions: Subscription[]) {
    subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Check if dark mode preference on device changes
   */
  isDarkModePreferred(): void {
    this.settingsService.isDarkModePreferred()
      .addEventListener('change', (event) => {
        return this.checkDarkModeToggle(event.matches);
      });
  }

  checkDarkModeToggle(shouldCheck: boolean) {
    this.settingsForm.controls.darkMode
      .setValue(shouldCheck);
  }
}
