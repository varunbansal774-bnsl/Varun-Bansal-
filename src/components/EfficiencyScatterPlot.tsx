import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Info, HelpCircle, Award, Target, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';

interface WheyProtein {
  id: string;
  brand: string;
  name: string;
  isCustom?: boolean;
  scoopSize: number;
  proteinPerScoop: number;
  fatPerScoop: number;
  carbsPerScoop: number;
  proteinType: 'Isolate' | 'Concentrate' | 'Hydrolyzed' | 'Blended';
  bioavailabilityScore: number;
  bioavailabilityDesc: string;
  additives: string[];
  ingredientsText: string;
  digestiveEnzymes: boolean;
  sweetenerType: string;
  colorsAndFlavors: string;
}

interface ComponentProps {
  selectedProteins: WheyProtein[];
}

export default function EfficiencyScatterPlot({ selectedProteins }: ComponentProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  
  // State for rich hovered information in React or D3 tooltip
  const [hoveredItem, setHoveredItem] = useState<WheyProtein | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current || selectedProteins.length === 0) return;

    // Clear previous SVG content to avoid duplicating elements
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll('*').remove();

    // Standard high-quality dimensions
    const width = 640;
    const height = 380;
    const margin = { top: 40, right: 140, bottom: 50, left: 60 };

    // Select the wrapper SVG container
    const svg = svgElement
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // Create main drawing area with responsive padding
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Extract values to find pretty bounds
    const data = selectedProteins.map(p => ({
      ...p,
      yieldPercent: (p.proteinPerScoop / p.scoopSize) * 100
    }));

    // Domain bounds with nice padding
    const minYield = d3.min(data, d => d.yieldPercent) || 50;
    const maxYield = d3.max(data, d => d.yieldPercent) || 100;
    const minBv = d3.min(data, d => d.bioavailabilityScore) || 100;
    const maxBv = d3.max(data, d => d.bioavailabilityScore) || 160;

    // Fixed but responsive pretty limits to ensure chart doesn't collapse with 1 item
    const xMin = Math.max(20, Math.floor(minYield - 10));
    const xMax = 100; // Yield never exceeds 100%
    const yMin = Math.max(70, Math.floor(minBv - 20));
    const yMax = Math.max(170, Math.ceil(maxBv + 10));

    // Scales
    const xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([chartHeight, 0]);

    // Color code protein types beautifully using clean sports aesthetics:
    const typeColor = (type: string) => {
      switch (type) {
        case 'Isolate': return '#4f46e5';     // Indigo
        case 'Hydrolyzed': return '#059669';  // Emerald/Mint
        case 'Concentrate': return '#d97706'; // Amber/Gold
        case 'Blended': return '#475569';     // Slate/Steel
        default: return '#6366f1';
      }
    };

    // 1. Subtle Quadrant Division Lines and Labels
    // Calculate mid points
    const midX = (xMin + xMax) / 2;
    const midY = (yMin + yMax) / 2;

    // Draw grid bounds for high/low efficiency quadrants
    g.append('rect')
      .attr('x', xScale(midX))
      .attr('y', 0)
      .attr('width', xScale(xMax) - xScale(midX))
      .attr('height', yScale(midY))
      .attr('fill', '#f0fdf4') // Emerald-50 background tint for high efficiency, high bioavailability
      .attr('opacity', 0.45);

    g.append('rect')
      .attr('x', 0)
      .attr('y', yScale(midY))
      .attr('width', xScale(midX))
      .attr('height', chartHeight - yScale(midY))
      .attr('fill', '#f1f5f9') // Slate tint for low/moderate region
      .attr('opacity', 0.25);

    // Coordinate dividing lines (Subtle dotted grid lines)
    g.append('line')
      .attr('x1', xScale(midX))
      .attr('y1', 0)
      .attr('x2', xScale(midX))
      .attr('y2', chartHeight)
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    g.append('line')
      .attr('x1', 0)
      .attr('y1', yScale(midY))
      .attr('x2', chartWidth)
      .attr('y2', yScale(midY))
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    // Quadrant Category labels
    g.append('text')
      .attr('x', xScale(xMax) - 8)
      .attr('y', 14)
      .attr('text-anchor', 'end')
      .attr('fill', '#047857')
      .attr('font-size', '8px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .style('letter-spacing', '0.05em')
      .text('🏆 GOLD STANDARD: HIGH YIELD & UPTAKE');

    g.append('text')
      .attr('x', 8)
      .attr('y', chartHeight - 8)
      .attr('text-anchor', 'start')
      .attr('fill', '#64748b')
      .attr('font-size', '8px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .style('letter-spacing', '0.05em')
      .text('MODERATE CORE COMPOSITION');

    // Gridlines helper function
    const xGrid = d3.axisBottom(xScale).ticks(5).tickSize(-chartHeight).tickFormat(() => '');
    const yGrid = d3.axisLeft(yScale).ticks(5).tickSize(-chartWidth).tickFormat(() => '');

    g.append('g')
      .attr('class', 'x-grid')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xGrid)
      .selectAll('.tick line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.5);

    g.append('g')
      .attr('class', 'y-grid')
      .call(yGrid)
      .selectAll('.tick line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.5);

    // Hide outer bounding line from grid setups
    g.selectAll('.x-grid .domain, .y-grid .domain').remove();

    // 2. Build the Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(6)
      .tickFormat(d => `${d}%`);

    const yAxis = d3.axisLeft(yScale)
      .ticks(6);

    const xAxisGroup = g.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    const yAxisGroup = g.append('g')
      .call(yAxis);

    // Style axes numbers to be clean JetBrains Mono / Inter style
    xAxisGroup.selectAll('.tick text')
      .attr('fill', '#64748b')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace')
      .attr('font-size', '9px')
      .attr('dy', '8px');

    yAxisGroup.selectAll('.tick text')
      .attr('fill', '#64748b')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace')
      .attr('font-size', '9px')
      .attr('dx', '-4px');

    // Style axes ticks
    xAxisGroup.selectAll('.tick line').attr('stroke', '#cbd5e1');
    yAxisGroup.selectAll('.tick line').attr('stroke', '#cbd5e1');
    xAxisGroup.select('.domain').attr('stroke', '#94a3b8');
    yAxisGroup.select('.domain').attr('stroke', '#94a3b8');

    // Axes Labels
    g.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 36)
      .attr('text-anchor', 'middle')
      .attr('fill', '#475569')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('font-family', 'sans-serif')
      .text('Protein Yield % (Physical Pure Protein Ratio per Scoop)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -38)
      .attr('text-anchor', 'middle')
      .attr('fill', '#475569')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('font-family', 'sans-serif')
      .text('Protein Bioavailability Score (Biological Value BV Index)');

    // 3. Coordinate Helper Dynamic Lines
    const helperXLine = g.append('line')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '4,3')
      .attr('opacity', 0);

    const helperYLine = g.append('line')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '4,3')
      .attr('opacity', 0);

    // 4. Draw Data Circles
    const circles = g.selectAll('.protein-dot')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${xScale(d.yieldPercent)}, ${yScale(d.bioavailabilityScore)})`);

    // Background halos for aesthetics
    circles.append('circle')
      .attr('r', 11)
      .attr('fill', d => typeColor(d.proteinType))
      .attr('opacity', 0.12)
      .attr('class', 'dot-halo');

    // Interactive core circle
    circles.append('circle')
      .attr('r', 6)
      .attr('fill', d => typeColor(d.proteinType))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .attr('class', 'dot-core')
      .style('cursor', 'pointer')
      .style('transition', 'all 0.15s ease-out');

    // Add high-efficiency icon labels inside each dot (optional numbering or simple text tags)
    circles.append('text')
      .attr('y', -14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#0f172a')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '9px')
      .attr('font-weight', '850')
      .attr('class', 'dot-label')
      .text(d => d.brand.split(' ')[0]);

    // 5. Interventions - Event Handlers
    g.selectAll('.dot-core, .dot-halo')
      .on('mouseover', function(this: any, event: any, d: any) {
        // Find actual target
        const hovered = d as WheyProtein;
        setHoveredItem(hovered);

        // Update coordinate lines
        const yVal = hovered.bioavailabilityScore;
        const xVal = (hovered.proteinPerScoop / hovered.scoopSize) * 100;

        helperXLine
          .attr('x1', 0)
          .attr('y1', yScale(yVal))
          .attr('x2', xScale(xVal))
          .attr('y2', yScale(yVal))
          .attr('opacity', 0.8)
          .attr('stroke', typeColor(hovered.proteinType));

        helperYLine
          .attr('x1', xScale(xVal))
          .attr('y1', yScale(yVal))
          .attr('x2', xScale(xVal))
          .attr('y2', chartHeight)
          .attr('opacity', 0.8)
          .attr('stroke', typeColor(hovered.proteinType));

        // Scale up corresponding nodes dynamically inside SVG
        d3.select(this.parentNode as any).select('.dot-core')
          .transition()
          .duration(120)
          .attr('r', 9.5)
          .attr('stroke-width', 2);

        d3.select(this.parentNode as any).select('.dot-halo')
          .transition()
          .duration(120)
          .attr('r', 16)
          .attr('opacity', 0.25);

        // Position of the parent relative container
        const bounding = rootRef.current?.getBoundingClientRect();
        if (bounding) {
          const xPos = xScale(xVal) + margin.left + 15;
          const yPos = yScale(yVal) + margin.top - 50;
          setTooltipPos({ x: xPos, y: yPos });
        }
      })
      .on('mouseout', function(this: any) {
        setHoveredItem(null);
        setTooltipPos(null);

        helperXLine.attr('opacity', 0);
        helperYLine.attr('opacity', 0);

        d3.select(this.parentNode as any).select('.dot-core')
          .transition()
          .duration(120)
          .attr('r', 6)
          .attr('stroke-width', 1.5);

        d3.select(this.parentNode as any).select('.dot-halo')
          .transition()
          .duration(120)
          .attr('r', 11)
          .attr('opacity', 0.12);
      });

    // 6. Legend on the Right Margin
    const types = ['Isolate', 'Hydrolyzed', 'Concentrate', 'Blended'];
    const legendG = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right + 15}, ${margin.top + 10})`);

    legendG.append('text')
      .attr('x', 0)
      .attr('y', -10)
      .attr('fill', '#94a3b8')
      .attr('font-size', '8.5px')
      .attr('font-weight', 'bold')
      .style('letter-spacing', '0.08em')
      .text('PROTEIN SOURCE');

    types.forEach((type, index) => {
      const legRow = legendG.append('g')
        .attr('transform', `translate(0, ${index * 18})`);

      legRow.append('circle')
        .attr('r', 4.5)
        .attr('fill', typeColor(type))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1);

      legRow.append('text')
        .attr('x', 11)
        .attr('y', 4.5)
        .attr('fill', '#475569')
        .attr('font-size', '10px')
        .attr('font-weight', '500')
        .text(type);
    });

  }, [selectedProteins]);

  // If no proteins are selected, render an elegant notification card
  if (selectedProteins.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-3">
        <Target className="h-10 w-10 text-slate-350 mx-auto" />
        <h4 className="font-bold text-slate-800 text-sm">No Selected Tubs to Chart</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          Please select at least one brand formulation in the **Active Formulations Grid** above to display the biological efficiency comparison map.
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative bg-white border border-slate-205 rounded-2xl p-5 shadow-xs space-y-4">
      
      {/* Title & Info blocks */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="inline-flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold text-indigo-700 border border-indigo-100/50">
            <Sparkles className="h-2.5 w-2.5 text-indigo-600" />
            D3 Biological Yield Mapping
          </span>
          <h3 className="text-base font-bold font-display text-slate-900 mt-1">Efficiency Dynamics: Protein Yield vs. Bioavailability</h3>
          <p className="text-xs text-slate-450 mt-0.5">
            Identify the cleanest, highest-absorption products. The upper-right quadrant contains premium, highly bioavailable isolates with minimal dry fats or carb fillers.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 p-1 px-2.5 rounded-lg">
          <Award className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          <span>{selectedProteins.length} Formulations Active</span>
        </div>
      </div>

      {/* SVG Canvas Frame */}
      <div className="relative overflow-visible mx-auto max-w-3xl">
        <svg 
          ref={svgRef} 
          className="border border-slate-50 bg-slate-100/10 rounded-xl overflow-visible shadow-2xs"
          style={{ maxHeight: '420px', minHeight: '260px' }}
        />

        {/* Floating Beautiful Absolute Tooltip */}
        {hoveredItem && tooltipPos && (
          <div 
            className="absolute z-50 pointer-events-none bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 p-3.5 w-60 animate-scaleIn transition-all duration-75 text-xs text-left"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y}px`,
              transition: 'left 0.1s ease-out, top 0.1s ease-out'
            }}
          >
            {/* Header section with brand and color classifications */}
            <div className="flex justify-between items-start gap-1 pb-1.5 border-b border-slate-800">
              <div>
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-450 font-mono">
                  {hoveredItem.brand}
                </span>
                <h4 className="font-bold text-[11px] text-white line-clamp-1 leading-tight mt-0.5">
                  {hoveredItem.name.replace(/\(.*?\)/g, '')}
                </h4>
              </div>
              <span className={`px-1.5 py-0.2 rounded-xs text-[8.5px] font-bold font-mono tracking-wider ${
                hoveredItem.proteinType === 'Isolate' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-805' :
                hoveredItem.proteinType === 'Hydrolyzed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                hoveredItem.proteinType === 'Concentrate' ? 'bg-amber-950 text-amber-400 border border-amber-900' :
                'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {hoveredItem.proteinType}
              </span>
            </div>

            {/* Core Comparative stats representing X and Y coordinate weights mapping to user's direct request */}
            <div className="space-y-1.5 pt-2 font-sans">
              <div className="flex justify-between items-center bg-slate-850 p-1 px-1.5 rounded">
                <span className="text-slate-400 text-[10.5px]">Protein Yield % (X):</span>
                <span className="font-mono text-emerald-400 font-extrabold text-[11px]">
                  {((hoveredItem.proteinPerScoop / hoveredItem.scoopSize) * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between items-center bg-slate-850 p-1 px-1.5 rounded">
                <span className="text-slate-400 text-[10.5px]">Bioavailability (Y):</span>
                <span className="font-mono text-indigo-400 font-extrabold text-[11px]">
                  BV {hoveredItem.bioavailabilityScore}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-mono">Scoop Serving:</span>
                <span className="text-slate-300 font-semibold">{hoveredItem.proteinPerScoop}g pro / {hoveredItem.scoopSize}g scoop</span>
              </div>
            </div>

            {/* Micro details listing excipients or bio score */}
            <p className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic leading-tight">
              &ldquo;{hoveredItem.bioavailabilityDesc}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Helper Bioactive Education Legend Footer */}
      <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl text-xs space-y-1 text-slate-600">
        <div className="flex gap-2 items-start">
          <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-800">Reading the Chart:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px] text-slate-500">
              <li><strong>The X-Axis (Protein Yield %)</strong> tells you how pure the raw processing filtering method is. A 100% yield would mean a perfectly pure compound without artificial chemical sweeteners or dry matter fat fillers.</li>
              <li><strong>The Y-Axis (Biological Value BV)</strong> tells you how absorbable the selected milk polypeptides are within humans. Whey Hydrolyzed is enzyme-isolated (BV 159), peaking faster, while simple Concentrate scores 104.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
