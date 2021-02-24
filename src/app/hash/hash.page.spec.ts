import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppService } from '../app.service';
import { CryptoService } from '../crypto.service';

import { HashPage } from './hash.page';

describe('HashPage', () => {
  let component: HashPage;
  let fixture: ComponentFixture<HashPage>;
  let appServiceSpy: jasmine.SpyObj<AppService>;
  let cryptoServiceSpy: jasmine.SpyObj<AppService>;

  beforeEach(waitForAsync(() => {
    appServiceSpy = jasmine.createSpyObj(AppService, ['copyOrShare']);
    cryptoServiceSpy = jasmine.createSpyObj(CryptoService, ['hash']);

    TestBed.configureTestingModule({
      declarations: [ HashPage ],
      imports: [ IonicModule.forRoot(), ReactiveFormsModule ],
      providers: [
        { provide: AppService, useValue:  appServiceSpy },
        { provide: CryptoService, useValue:  cryptoServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
