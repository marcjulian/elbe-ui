import { Component } from '@angular/core';
import { Chart } from '@tanstack/angular-charts';
import { areaY, d3Curve, defineChart, dot, lineY, whenFocused } from '@tanstack/charts';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleLinear, scalePoint } from 'd3-scale';
import { curveMonotoneX } from 'd3-shape';

interface UsageRow {
  date: string;
  user: number;
  customer: number;
}

const usage: readonly UsageRow[] = [
  { date: '2025-08-01', user: 3200, customer: 820 },
  { date: '2025-08-02', user: 2100, customer: 540 },
  { date: '2025-08-03', user: 4100, customer: 1100 },
  { date: '2025-08-04', user: 2800, customer: 760 },
  { date: '2025-08-05', user: 4800, customer: 1350 },
  { date: '2025-08-06', user: 3600, customer: 980 },
  { date: '2025-08-07', user: 1900, customer: 430 },
  { date: '2025-08-08', user: 4400, customer: 1200 },
  { date: '2025-08-09', user: 3300, customer: 880 },
  { date: '2025-08-10', user: 5100, customer: 1450 },
  { date: '2025-08-11', user: 2600, customer: 670 },
  { date: '2025-08-12', user: 4700, customer: 1290 },
  { date: '2025-08-13', user: 3900, customer: 1080 },
  { date: '2025-08-14', user: 4500, customer: 1250 },
  { date: '2025-08-15', user: 5200, customer: 1480 },
];

@Component({
  selector: 'elb-chart-preview',
  imports: [Chart],
  template: `
    <tanstack-chart [options]="chartOptions" />
    <div
      class="text-muted-foreground flex justify-center gap-2 pt-2 text-xs"
      aria-label="Chart series"
    >
      <div class="flex items-center gap-1.5">
        <span class="bg-chart-1 size-2 shrink-0 rounded-xs"></span>
        <span>User</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="bg-chart-2 size-2 shrink-0 rounded-xs"></span>
        <span>Customer</span>
      </div>
    </div>
  `,
})
export class ChartPreview {
  chartOptions = {
    ariaLabel: 'Users and customers over time',
    definition: defineChart(
      {
        marks: [
          areaY(usage, {
            key: 'user',
            x: 'date',
            y1: 0,
            y2: 'user',
            fill: 'var(--chart-1)',
            curve: d3Curve(curveMonotoneX),
          }),
          areaY(usage, {
            x: 'date',
            y1: 0,
            y2: 'customer',
            fill: 'var(--chart-2)',
            curve: d3Curve(curveMonotoneX),
          }),
          lineY(usage, {
            x: 'date',
            y: 'user',
            stroke: 'var(--chart-1)',
            curve: d3Curve(curveMonotoneX),
          }),
          lineY(usage, {
            x: 'date',
            y: 'customer',
            stroke: 'var(--chart-2)',
            curve: d3Curve(curveMonotoneX),
          }),
          whenFocused(
            dot(usage, {
              x: 'date',
              y: 'user',
              r: 4.5,
              stroke: 'Canvas',
              strokeWidth: 2,
            }),
            { match: 'x' },
          ),
          whenFocused(
            dot(usage, {
              x: 'date',
              y: 'customer',
              r: 4.5,
              stroke: 'Canvas',
              strokeWidth: 2,
            }),
            { match: 'x' },
          ),
        ],
        x: {
          scale: scalePoint,
          axis: {
            ticks: {
              padding: 10,
              values: ['2025-08-03', '2025-08-06', '2025-08-09', '2025-08-12'],
              size: 0,
              format: (value) =>
                new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  timeZone: 'UTC',
                }).format(new Date(`${value}T00:00:00Z`)),
            },
          },
        },
        y: { scale: scaleLinear, nice: true, axis: false },
      },
      {
        focus: 'group-x',
        tooltip: {
          use: tooltip,
          items: [
            { field: 'user', label: 'User' },
            { field: 'customer', label: 'Customer' },
          ],
        },
      },
    ),
  };
}
