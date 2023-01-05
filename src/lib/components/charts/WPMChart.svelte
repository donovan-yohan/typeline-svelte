<script lang="ts">
	import { data } from './data.js';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	Chart.register(...registerables);

	let chartElement: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		if (browser) {
			chart = new Chart(chartElement, {
				type: 'bar',
				data: data,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							grid: {
								color: 'hsl(43 100% 52% / 10%)'
							},
							ticks: { color: 'hsl(43 100% 52% )' }
						},
						y: {
							beginAtZero: false,
							ticks: { color: 'hsl(43 100% 52% )', font: { size: 18 } },
							grid: {
								color: 'hsl(43 100% 52% / 40%)'
							},
							title: {
								display: true,
								text: 'Satisfaction (%)',
								color: 'hsl(43 100% 52% )',
								font: { size: 24, family: 'Merriweather' }
							}
						}
					}
				}
			});
		}
	});

	$: legend = chart?.legend?.legendItems || [];
</script>

<div class="chartContainer">
	<div class="overflow">
		<div class="legend">
			{#each legend as l, i (i)}
				<div class="legendItem label" style={`color: ${l.fontColor?.toString() || 'black'}`}>
					<span
						class={l.pointStyle?.toString() || 'circle'}
						style={`color: ${l.fontColor?.toString() || 'black'}`}
					/>
					{l.text}
				</div>
			{/each}
		</div>
		<canvas bind:this={chartElement} />
	</div>
</div>

<style>
	.chartContainer {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.overflow {
		overflow: hidden;
		height: 100%;
	}
	.legend {
		display: flex;
		position: absolute;
		left: 108px;
	}
	.legendItem {
		display: flex;
		margin-right: 64px;
	}
	.crossRot,
	.circle,
	.cross {
		position: relative;
		display: inline-block;
		min-height: 16px;
		min-width: 16px;
		height: 16px;
		width: 16px;
		margin-right: 12px;
		margin-top: 6px;
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
		/*  TODO: make colour dynamic */
		background-color: red;
	}
	.crossRot:before {
		transform: rotate(45deg);
	}
	.crossRot:after {
		transform: rotate(-45deg);
	}
	.cross:before,
	.cross:after {
		/*  TODO: make colour dynamic */
		background-color: white;
	}
	.cross:after {
		transform: rotate(90deg);
	}
	.circle {
		border-radius: 50%;
	}
</style>
