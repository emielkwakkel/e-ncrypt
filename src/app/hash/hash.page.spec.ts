import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HashPage } from './hash.page';

describe('HashPage', () => {
  let component: HashPage;
  let fixture: ComponentFixture<HashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HashPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
