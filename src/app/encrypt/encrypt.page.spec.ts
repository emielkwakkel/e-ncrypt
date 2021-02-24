import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppService } from '../app.service';
import { CryptoService } from '../crypto.service';

import { EncryptPage } from './encrypt.page';

describe('EncryptPage', () => {
  let component: EncryptPage;
  let fixture: ComponentFixture<EncryptPage>;
  let appServiceSpy: jasmine.SpyObj<AppService>;
  let cryptoServiceSpy: jasmine.SpyObj<AppService>;

  beforeEach(waitForAsync(() => {
    appServiceSpy = jasmine.createSpyObj(AppService, ['copyOrShare']);
    cryptoServiceSpy = jasmine.createSpyObj(CryptoService, ['encrypt', 'decrypt']);
    TestBed.configureTestingModule({
      declarations: [ EncryptPage ],
      imports: [ IonicModule.forRoot(), ReactiveFormsModule ],
      providers: [
        { provide: AppService, useValue: appServiceSpy },
        { provide: CryptoService, useValue: cryptoServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EncryptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
