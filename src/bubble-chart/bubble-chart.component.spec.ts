import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import '../../config/testing-utils';
import { bubble } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

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
  let compiled: any;

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
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should set the svg width and height', () => {
    console.log('should set the svg width and height:', compiled);
    const svg = compiled.querySelectorAll('svg')[0];

    expect(svg.getAttribute('width')).toEqual('400');
    expect(svg.getAttribute('height')).toEqual('800');
  });

  it('should render 12 circle elements', () => {
    console.log('should render 12 circle elements:', compiled);
    expect(compiled.querySelectorAll('g.circle').length).toEqual(12);
  });

});
