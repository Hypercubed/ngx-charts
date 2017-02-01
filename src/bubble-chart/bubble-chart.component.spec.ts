import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import d3 from '../d3';
import '../../config/testing-utils';
import { bubble } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { BubbleChartModule } from './bubble-chart.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

@Component({
  selector: 'test-component',
  template: `<ngx-charts-bubble-chart
              [view]="[400,800]"
              [scheme]="colorScheme"
              [results]="results">
            </ngx-charts-bubble-chart>`
})
class TestComponent {
  results: any[] = bubble;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bubble-chart>', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [BubbleChartModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should set the svg width and height', (done) => {
    const compiled = fixture.debugElement.nativeElement;
    const svg = d3.select(compiled.querySelectorAll('svg')[0]);

    expect(svg.attr('width')).toEqual('400');
    expect(svg.attr('height')).toEqual('800');
    done();
  });

  it('should render 12 circle elements', (done) => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelectorAll('g.circle').length).toEqual(12);
    done();
  });

});
