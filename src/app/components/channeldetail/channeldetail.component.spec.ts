import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneldetailComponent } from './channeldetail.component';

describe('ChanneldetailComponent', () => {
  let component: ChanneldetailComponent;
  let fixture: ComponentFixture<ChanneldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanneldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanneldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
