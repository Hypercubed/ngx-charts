import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import '../../config/testing-utils';
import { bubble } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// import { BubbleChartModule } from './bubble-chart.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
import { ChartCommonModule } from '../common/chart-common.module';

@Component({
  selector: 'test-component',
  template: `<ngx-charts-bubble-chart
              [view]="[400,800]"
              [scheme]="colorScheme"
              [results]="results">
            </ngx-charts-bubble-chart>`
})
class TestHostComponent {
  results: any[] = bubble;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bubble-chart>', () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, BubbleChartComponent, BubbleSeriesComponent],
      imports: [ChartCommonModule/* , BubbleChartModule */],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should set the svg width and height', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      console.log('should set the svg width and height:', el);
      const svg = el.querySelectorAll('svg')[0];

      expect(svg.getAttribute('width')).toEqual('400');
      expect(svg.getAttribute('height')).toEqual('800');
    });

  }));

  it('should render 12 circle elements', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      console.log('should render 12 circle elements:', el);
      const svg = el.querySelectorAll('svg')[0];

      expect(svg.querySelectorAll('g.circle').length).toEqual(12);
    });

  }));

});
