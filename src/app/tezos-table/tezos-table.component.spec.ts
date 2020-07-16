import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TezosTableComponent } from './tezos-table.component';

describe('TezosTableComponent', () => {
  let component: TezosTableComponent;
  let fixture: ComponentFixture<TezosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TezosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TezosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
