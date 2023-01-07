<script lang="ts">
	import { typelineTheme } from '$lib/stores/TypelineTheme.store';
	import {
		Chart,
		registerables,
		type ChartData,
		type ChartOptions,
		type Color,
		type PointStyle,
		type TooltipItem
	} from 'chart.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import {
		AvgWPMDatasetConfig,
		CorrectedDatasetConfig,
		ErrorDatasetConfig,
		RawWPMDatasetConfig
	} from './WPMChart.config';
	import { sampleChartStats, sampleStats } from './data';
	import { formatTime } from '$lib/utils/time.util';
	import { getLabelString } from './WPMChart.util';
	import { generateChartStats } from '$lib/utils/chart/chart.utils';

	Chart.register(...registerables);

	export let stats = sampleChartStats;

	// initialize reactive variables for typescript
	let options: ChartOptions<'line'>;
	let chartData: ChartData<'line'>;

	$: highlight = $typelineTheme.primary[500];
	$: foreground = $typelineTheme.default;
	$: background = $typelineTheme.surface[700];
	$: incorrect = $typelineTheme.error[500];

	$: chartData = {
		labels: stats.map((_, i) => i + 1),
		datasets: [
			{
				...AvgWPMDatasetConfig,
				data: stats.map((s) => s.wpm),
				backgroundColor: highlight,
				borderColor: highlight
			},
			{
				...RawWPMDatasetConfig,
				data: stats.map((s) => s.raw),
				backgroundColor: foreground,
				borderColor: foreground
			},
			{
				...ErrorDatasetConfig,
				data: stats.map((s) => (s.incorrectInInterval > 0 ? s.incorrectInInterval : null)),
				backgroundColor: incorrect,
				borderColor: incorrect,
				pointBorderColor: incorrect
			},
			{
				...CorrectedDatasetConfig,
				data: stats.map((s) => (s.correctedInInterval > 0 ? s.correctedInInterval : null)),
				backgroundColor: foreground,
				borderColor: foreground,
				pointBorderColor: foreground
			}
		]
	};

	$: hasLowWPM = stats.some((s) => s.wpm < 10 || s.raw < 10);
	$: needsMinHeight = stats.every((s) => s.wpm < 47 && s.raw < 47);

	$: options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			wpmAxis: {
				type: 'linear',
				display: true,
				position: 'left',
				grid: {
					display: false
				},
				border: {
					display: false
				},
				// stop WPM axis from going negative for very low WPM
				min: hasLowWPM ? -0.99 : 0,
				max: needsMinHeight ? 50 : undefined,
				suggestedMin: 0,
				grace: '10%',
				ticks: {
					font: {
						weight: '400'
					},
					callback: function (val: number | string) {
						if (typeof val === 'string') return val;
						return val > 0 ? val : Math.ceil(val);
					}
				}
			},
			errorAxis: {
				type: 'linear',
				display: true,
				position: 'right',
				grid: {
					display: false
				},
				border: {
					display: false
				},
				ticks: {
					color: background,
					callback: (tick: number | string) => {
						if (typeof tick === 'string') return tick;
						if (tick % 1 === 0) return tick;
					}
				},
				min: 0,
				grace: '5%'
			},
			x: {
				grid: {
					display: false
				},
				border: {
					display: false
				},
				ticks: {
					font: {
						weight: '400'
					}
				}
			}
		},
		plugins: {
			legend: {
				display: false,
				labels: {
					generateLabels: (chart: Chart<'line'>) => {
						const data = chart.data.datasets;
						return data.map((l, i) => {
							return {
								text: l.label?.toLowerCase() || '',
								fontColor: l.backgroundColor as Color,
								fillStyle: 'fill',
								strokeStyle: 'none',
								//@ts-ignore
								pointStyle: l.pointStyle as PointStyle,
								fillColor: l.backgroundColor as Color,
								color: l.backgroundColor as Color,
								datasetIndex: i
							};
						});
					}
				},
				onClick: () => {}
			},
			tooltip: {
				titleColor: foreground,
				usePointStyle: true,
				backgroundColor: background,
				boxWidth: 12,
				padding: 16,
				bodySpacing: 4,
				bodyFont: {
					weight: 'normal'
				},
				cornerRadius: 2,
				caretSize: 6,
				caretPadding: 4,
				multiKeyBackground: 'rgba(0,0,0,0)',
				callbacks: {
					title: (context: TooltipItem<'line'>[]) => {
						return formatTime(context[0].parsed.x + 1);
					},
					label: (context: TooltipItem<'line'>) => {
						return getLabelString(context);
					},
					labelTextColor: (context: TooltipItem<'line'>) =>
						context.dataset.backgroundColor as Color,
					labelColor: (context: TooltipItem<'line'>) => {
						return {
							bodyColor: context.dataset.backgroundColor as Color,
							borderColor: context.dataset.backgroundColor as Color,
							backgroundColor: context.dataset.backgroundColor as Color,
							borderWidth: 0,
							borderDash: undefined,
							borderRadius: 0
						};
					}
				}
			}
		}
	};

	let chartElement: HTMLCanvasElement;
	let chart: Chart;

	$: if (browser) {
		chart = new Chart(chartElement, {
			type: 'line',
			data: chartData,
			options
		});
	}

	$: legend = ($typelineTheme && chart?.legend?.legendItems) || [];
</script>

<div class="relative h-full w-full">
	<div class="h-full overflow-hidden">
		<div class="absolute flex w-full justify-center gap-16">
			{#each legend as l, i (i)}
				<div class="flex font-bold" style={`color: ${l.fontColor?.toString() || 'black'}`}>
					<span
						class={`icon min-h-4 min-w-4 relative mr-3 mt-1 inline-block h-4 w-4 ${
							l.pointStyle?.toString() || 'circle'
						}`}
						style={`
							--color: ${l.fontColor?.toString() || $typelineTheme.default};
						`}
					/>
					{l.text}
				</div>
			{/each}
		</div>
		<canvas bind:this={chartElement} />
	</div>
</div>

<style>
	.icon {
		color: var(--color);
		background-color: var(--color);
	}
	.crossRot,
	.cross {
		background-color: transparent !important;
		margin-top: 4px;
	}
	.crossRot:before,
	.crossRot:after,
	.cross:before,
	.cross:after {
		position: absolute;
		content: '';
		width: 100%;
		height: 3px; /* cross thickness */
		border-radius: 4px;
		top: 50%;
		background-color: var(--color);
	}
	.crossRot:before {
		transform: rotate(45deg);
	}
	.crossRot:after {
		transform: rotate(-45deg);
	}

	.cross:after {
		transform: rotate(90deg);
	}
	.circle {
		border-radius: 50%;
	}
</style>
