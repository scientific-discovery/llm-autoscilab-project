/* ==========================================================================
   LLM-AutoSciLab project page - results data and chart wiring.

   Sources (arXiv 2605.24043):
   - Table 3: main results by difficulty; Table 5: mean +/- s.d. over 3 seeds.
   - Table 4: LLM backbone comparison.
   - Figure 4 (ablation) and Figure 7 (relative sample efficiency): the values
     printed on the paper's bars.
   ========================================================================== */
(function () {
  'use strict';

  var C = VIZ.color;
  var DIFFS = ['Easy', 'Medium', 'Hard', 'Overall'];

  /* per difficulty: [metric1, metric2, metric3]; sd: overall s.d. over 3 seeds */
  var BENCH = {
    newton: {
      name: 'NewtonBench',
      groups: { passive: 'No experiment design', active: 'Active experiment design', ours: 'Ours' },
      metrics: [
        { label: 'Symbolic accuracy', short: 'SA', unit: '%', better: 'higher' },
        { label: 'Exact accuracy', short: 'Exact', unit: '%', better: 'higher' },
        { label: 'RMSLE', short: 'RMSLE', better: 'lower', log: true }
      ],
      rows: [
        { key: 'pysr', label: 'PySR', group: 'passive', v: [[38.89, 88.89, 0.030], [27.78, 75.00, 0.125], [5.56, 59.72, 0.398], [24.07, 74.54, 0.182]], sd: [0.00, 1.96, 0.008] },
        { key: 'bo', label: 'Bayesian Optimization', short: 'Bayesian Opt.', group: 'active', v: [[40.28, 84.72, 0.070], [27.78, 70.83, 0.212], [5.56, 50.00, 0.730], [24.54, 68.52, 0.334]], sd: [0.65, 2.62, 0.023] },
        { key: 'bed', label: 'Bayesian Experimental Design', short: 'BED', group: 'active', v: [[19.44, 78.57, 0.307], [11.11, 66.18, 0.449], [2.78, 45.31, 1.010], [11.11, 63.86, 0.577]], sd: [0.00, 1.09, 0.044] },
        { key: 'llm', label: 'LLM-only', group: 'active', v: [[16.67, 19.44, 3.572], [2.78, 2.78, 4.738], [0.00, 0.00, 6.757], [6.48, 7.41, 5.039]], sd: [0.40, 0.80, 0.156] },
        { key: 'code', label: 'Code-assisted LLM', short: 'Code-assisted', group: 'active', v: [[13.89, 19.44, 4.372], [5.56, 11.11, 5.437], [2.78, 0.00, 4.897], [7.41, 10.19, 4.912]], sd: [0.50, 0.20, 0.128] },
        { key: 'ours', label: 'LLM-AutoSciLab', group: 'ours', hl: true, v: [[79.20, 93.10, 0.018], [72.20, 84.70, 0.040], [51.40, 66.70, 0.404], [67.60, 81.50, 0.150]], sd: [0.20, 1.30, 0.003] }
      ]
    },
    chem: {
      name: 'ActiveSciBench-Chem',
      groups: { passive: 'No experiment design', active: 'Active experiment design', ours: 'Ours' },
      metrics: [
        { label: 'Symbolic accuracy', short: 'SA', unit: '%', better: 'higher' },
        { label: 'Exact accuracy', short: 'Exact', unit: '%', better: 'higher' },
        { label: 'RMSLE', short: 'RMSLE', better: 'lower', log: true }
      ],
      rows: [
        { key: 'pysr', label: 'PySR', group: 'passive', v: [[33.33, 33.33, 0.455], [0.00, 11.54, 1.545], [0.00, 0.00, 0.601], [7.89, 15.79, 1.212]], sd: [0.00, 1.20, 0.016] },
        { key: 'bo', label: 'Bayesian Optimization', short: 'Bayesian Opt.', group: 'active', v: [[22.22, 14.29, 2.001], [0.00, 3.85, 1.338], [0.00, 0.00, 6.564], [5.26, 6.98, 1.960]], sd: [0.40, 2.60, 0.288] },
        { key: 'bed', label: 'Bayesian Experimental Design', short: 'BED', group: 'active', v: [[77.78, 77.78, 0.028], [19.23, 30.77, 0.333], [0.00, 0.00, 0.187], [31.58, 39.47, 0.249]], sd: [0.00, 1.50, 0.015] },
        { key: 'llm', label: 'LLM-only', group: 'active', v: [[0.00, 0.00, 0.563], [0.00, 0.00, 0.777], [0.00, 0.00, 0.849], [0.00, 0.00, 0.764]], sd: [0.00, 0.00, 0.189] },
        { key: 'code', label: 'Code-assisted LLM', short: 'Code-assisted', group: 'active', v: [[0.00, 0.00, 0.554], [0.00, 0.00, 0.869], [0.00, 0.00, 0.894], [0.00, 0.00, 0.824]], sd: [0.00, 0.00, 0.183] },
        { key: 'ours', label: 'LLM-AutoSciLab', group: 'ours', hl: true, v: [[55.56, 88.89, 0.298], [22.22, 37.04, 0.179], [42.86, 52.38, 0.154], [35.09, 50.88, 0.189]], sd: [0.80, 2.60, 0.004] }
      ]
    },
    grn: {
      name: 'ActiveSciBench-GRN',
      groups: { offline: 'Offline graph discovery', active: 'Active experiment design', ours: 'Ours' },
      metrics: [
        { label: 'Edge F1', short: 'F1', unit: '%', better: 'higher' },
        { label: 'Exact graph accuracy', short: 'Exact graph', unit: '%', better: 'higher' },
        { label: 'Sign accuracy', short: 'Sign', unit: '%', better: 'higher' }
      ],
      rows: [
        { key: 'genie3', label: 'GENIE3', group: 'offline', v: [[41.54, 0.00, 85.33], [35.00, 0.00, 71.89], [39.27, 0.00, 80.00], [38.60, 0.00, 79.07]], sd: [0.00, 0.00, 1.60] },
        { key: 'gies', label: 'GIES', group: 'offline', v: [[70.12, 20.00, 97.78], [47.07, 0.00, 80.56], [51.61, 0.00, 79.00], [56.27, 6.67, 85.78]], sd: [1.80, 1.33, 2.30] },
        { key: 'notears', label: 'NOTEARS', group: 'offline', v: [[31.52, 0.00, 66.67], [25.71, 0.00, 56.67], [25.57, 6.67, 51.11], [27.60, 2.22, 58.15]], sd: [1.20, 0.00, 1.30] },
        { key: 'random', label: 'Random sampling', short: 'Random', group: 'active', v: [[33.64, 0.00, 86.67], [33.46, 0.00, 86.67], [39.58, 6.67, 80.00], [35.56, 2.22, 84.44]], sd: [3.80, 0.00, 2.00] },
        { key: 'unc', label: 'Uncertainty sampling', short: 'Uncertainty', group: 'active', v: [[55.26, 13.33, 93.33], [49.63, 0.00, 86.67], [45.40, 0.00, 84.44], [50.10, 4.44, 88.15]], sd: [1.40, 0.00, 2.00] },
        { key: 'llm', label: 'LLM-only', group: 'active', v: [[53.61, 0.00, 81.67], [46.11, 0.00, 77.78], [51.51, 0.00, 78.89], [50.41, 0.00, 79.44]], sd: [3.50, 0.00, 0.60] },
        { key: 'code', label: 'Code-assisted LLM', short: 'Code-assisted', group: 'active', v: [[51.73, 0.00, 82.78], [57.65, 0.00, 91.67], [54.63, 0.00, 83.33], [54.67, 0.00, 85.98]], sd: [4.70, 0.00, 0.90] },
        { key: 'ours', label: 'LLM-AutoSciLab', group: 'ours', hl: true, v: [[66.27, 26.67, 100.0], [83.13, 40.00, 100.0], [68.06, 26.67, 94.44], [72.49, 31.11, 98.15]], sd: [1.30, 1.33, 0.30] }
      ]
    }
  };

  var state = { bench: 'newton', metric: 0 };
  var metricCtl = null;

  function fmtMetric(m, v) {
    if (m.log) return v.toFixed(3);
    return v.toFixed(1) + '%';
  }

  function renderMain() {
    var B = BENCH[state.bench];
    var m = B.metrics[state.metric];
    var mi = state.metric;
    var el = document.getElementById('chart-main');
    el.replaceChildren();
    VIZ.hPanels(el, {
      ariaLabel: m.label + ' by difficulty on ' + B.name,
      rows: B.rows.map(function (r) { return { key: r.key, label: r.label, short: r.short, group: r.group, hl: !!r.hl, src: r }; }),
      groups: B.groups,
      labelWidth: 200,
      rowHeight: 27,
      minPanelWidth: 165,
      rightPad: 34,
      panels: DIFFS.map(function (d, di) {
        var isOverall = di === 3;
        var p = {
          title: d,
          sub: isOverall ? 'mean ± s.d. over 3 seeds' : null,
          get: function (r) { return r.src.v[di][mi]; },
          fmt: function (v) { return m.log ? v.toFixed(3) : v.toFixed(1); },
          tipLabel: d,
          tipValue: function (v, r) {
            var s = fmtMetric(m, v);
            if (isOverall) s += ' ± ' + (m.log ? r.src.sd[mi].toFixed(3) : r.src.sd[mi].toFixed(2));
            return s;
          }
        };
        if (m.log) {
          p.scale = 'log'; p.domain = [0.01, 10]; p.mark = 'dot'; p.ticks = [0.01, 0.1, 1, 10];
          p.tickFormat = function (t) { return String(t); };
        } else {
          p.scale = 'linear'; p.domain = [0, 100]; p.mark = 'bar'; p.ticks = [0, 50, 100];
          if (isOverall) p.err = function (r) { return r.src.sd[mi]; };
        }
        return p;
      }),
      tipTitle: function (r) { return r.label + ' · ' + m.label; },
      tipNote: function () { return m.better === 'lower' ? 'Lower is better.' : 'Higher is better.'; }
    });

    /* full table for the selected benchmark */
    var cols = [{ key: 'label', label: 'Method' }];
    var groups = [{ label: '', span: 1 }];
    DIFFS.forEach(function (d, di) {
      groups.push({ label: d, span: 3 });
      B.metrics.forEach(function (mm, k) {
        cols.push({
          key: 'c' + di + '_' + k, label: mm.short, num: true, better: mm.better,
          fmt: (function (mm2, di2, k2) {
            return function (v, r) {
              if (v === null || v === undefined) return '—';
              var s = mm2.log ? v.toFixed(3) : v.toFixed(2);
              if (di2 === 3 && r._sd) s += ' ± ' + (mm2.log ? r._sd[k2].toFixed(3) : r._sd[k2].toFixed(2));
              return s;
            };
          })(mm, di, k)
        });
      });
    });
    var rows = [], last = null;
    B.rows.forEach(function (r) {
      if (r.group !== last) { rows.push({ _group: B.groups[r.group] }); last = r.group; }
      var o = { label: r.label, _ours: !!r.hl, _sd: r.sd };
      r.v.forEach(function (vals, di) { vals.forEach(function (v, k) { o['c' + di + '_' + k] = v; }); });
      rows.push(o);
    });
    VIZ.table(document.getElementById('table-main'), {
      caption: B.name + ': ' + B.metrics.map(function (mm) { return mm.label + (mm.unit ? ' (%)' : ''); }).join(', ') +
        ' by difficulty (Table 3); overall values are mean ± s.d. over 3 seeds (Table 5). Bold = best, underline = second best.',
      colGroups: groups,
      columns: cols,
      rows: rows
    });
  }

  function setBench(b) {
    state.bench = b;
    state.metric = 0;
    var ctl = document.getElementById('ctl-metric');
    ctl.replaceChildren();
    metricCtl = VIZ.segmented(ctl, BENCH[b].metrics.map(function (m, i) { return { value: i, label: m.label }; }), 0, function (v) {
      state.metric = v; renderMain();
    });
    renderMain();
  }

  /* ---------------- fitting the data vs recovering the law ---------------- */
  function renderFitVsLaw() {
    [['newton', 'scatter-newton'], ['chem', 'scatter-chem']].forEach(function (pair) {
      var B = BENCH[pair[0]];
      var pts = [];
      var LABELS = pair[0] === 'newton' ? {
        pysr: { dx: 10, dy: 2 }, bo: { dx: -10, dy: -8, anchor: 'end' }, bed: { dx: -10, dy: 8, anchor: 'end' },
        llm: { dx: -2, dy: -14, anchor: 'end' }, code: { dx: 10, dy: -4 }, ours: { dx: -11, dy: 0, anchor: 'end' }
      } : {
        pysr: { dx: 10, dy: -6 }, bo: { dx: 10, dy: 6 }, bed: { dx: -10, dy: -4, anchor: 'end' },
        ours: { dx: 11, dy: -2 }
      };
      B.rows.forEach(function (r) {
        var ex = r.v[3][1], sa = r.v[3][0];
        if (pair[0] === 'chem' && r.key === 'code') return; /* shares (0, 0) with LLM-only */
        var label = r.short || r.label;
        if (pair[0] === 'chem' && r.key === 'llm') label = 'LLM-only, Code-assisted';
        pts.push({ key: r.key, label: label, full: pair[0] === 'chem' && r.key === 'llm' ? 'LLM-only and Code-assisted LLM' : r.label,
          x: ex, y: sa, hl: !!r.hl, showLabel: !!LABELS[r.key], labelPos: LABELS[r.key],
          keepLabel: (pair[0] === 'newton' && r.key === 'pysr') || (pair[0] === 'chem' && r.key === 'bed') });
      });
      VIZ.scatter(document.getElementById(pair[1]), {
        ariaLabel: 'Symbolic accuracy against exact accuracy on ' + B.name,
        height: 330,
        labelMinWidth: 330,
        x: { domain: [0, 100], label: 'Exact accuracy: numerical fit (%)', ticks: [0, 25, 50, 75, 100] },
        y: { domain: [0, 100], label: 'Symbolic accuracy (%)', ticks: [0, 25, 50, 75, 100] },
        diagonal: true,
        diagonalLabel: 'symbolic = exact',
        points: pts,
        tip: function (p) {
          return { title: p.full + ' · ' + B.name, rows: [
            { value: p.y.toFixed(1) + '%', label: 'symbolic accuracy' },
            { value: p.x.toFixed(1) + '%', label: 'exact accuracy' }
          ], note: p.x - p.y > 20 ? 'Fits the data far more often than it recovers the law.' : null };
        }
      });
    });
  }

  /* ---------------- Figure 7: relative sample efficiency ---------------- */
  var REL = [
    { id: 'rel-newton', name: 'NewtonBench', ref: 20, rows: [
      ['PySR', 2.17], ['Bayesian Optimization', 2.58, 'Bayesian Opt.'], ['BED', 2.42], ['LLM-only', 2.75], ['Code-assisted LLM', 2.92, 'Code-assisted']] },
    { id: 'rel-chem', name: 'ActiveSciBench-Chem', ref: 60, rows: [
      ['PySR', 2.57], ['Bayesian Optimization', 2.43, 'Bayesian Opt.'], ['BED', 2.36], ['LLM-only', 5.97], ['Code-assisted LLM', 5.20, 'Code-assisted']] },
    { id: 'rel-grn', name: 'ActiveSciBench-GRN', ref: 20, rows: [
      ['GENIE3', 2.40], ['GIES', 1.30], ['NOTEARS', 1.90], ['Random sampling', 4.60, 'Random'], ['Uncertainty sampling', 3.90, 'Uncertainty'],
      ['LLM-only', 7.40], ['Code-assisted LLM', 6.70, 'Code-assisted']] }
  ];

  function renderRelative() {
    REL.forEach(function (b) {
      VIZ.hPanels(document.getElementById(b.id), {
        ariaLabel: 'Queries each method needs, relative to LLM-AutoSciLab, on ' + b.name,
        rows: b.rows.map(function (r, i) { return { key: 'r' + i, label: r[0], short: r[2], val: r[1] }; }),
        labelWidth: 150,
        rowHeight: 28,
        rightPad: 40,
        panels: [{
          title: b.name, sub: 'Reference budget B = ' + b.ref,
          scale: 'linear', domain: [0, 8], mark: 'bar', ticks: [0, 2, 4, 6, 8],
          tickFormat: function (t) { return t + '×'; },
          get: function (r) { return r.val; },
          fmt: function (v) { return v.toFixed(2) + '×'; },
          refLine: { value: 1, color: C.ours },
          tipLabel: 'queries needed vs LLM-AutoSciLab',
          tipValue: function (v) { return v.toFixed(2) + '×'; }
        }],
        tipTitle: function (r) { return r.label + ' · ' + b.name; },
        tipNote: function (r) {
          return 'Needs ' + Math.round(r.val * b.ref) + ' queries to match what LLM-AutoSciLab reaches with B = ' + b.ref + '.';
        }
      });
    });
    var rows = [];
    REL.forEach(function (b) {
      rows.push({ _group: b.name + ' (LLM-AutoSciLab budget B = ' + b.ref + ')' });
      b.rows.forEach(function (r) { rows.push({ label: r[0], x: r[1], q: Math.round(r[1] * b.ref) }); });
    });
    VIZ.table(document.getElementById('table-rel'), {
      caption: 'Queries each method needs to match LLM-AutoSciLab’s fixed-budget performance (Figure 7).',
      columns: [
        { key: 'label', label: 'Method' },
        { key: 'x', label: 'Relative queries', num: true, fmt: function (v) { return v.toFixed(2) + '×'; } },
        { key: 'q', label: '≈ Queries', num: true, fmt: function (v) { return String(v); } }
      ],
      rows: rows
    });
  }

  /* ---------------- Figure 4: ablation ---------------- */
  var ABL_ROWS = [
    { key: 'full', label: 'Full model', hl: true },
    { key: 'mem', label: 'w/o Memory' },
    { key: 'ens', label: 'w/o Adaptive Ensemble', short: 'w/o Ensemble' },
    { key: 'conf', label: 'w/o Confidence Gating', short: 'w/o Conf. Gating' },
    { key: 'hca', label: 'w/o Hypothesis-Conditioned Acquisition', short: 'w/o H.-C. Acquisition' }
  ];
  var ABL = [
    { title: 'NewtonBench', metric: 'Symbolic accuracy', max: 60, v: { full: 54.17, mem: 50, ens: 33.33, conf: 33.33, hca: 25 } },
    { title: 'ActiveSciBench-Chem', metric: 'Symbolic accuracy', max: 40, v: { full: 36.6, mem: 10.2, ens: 18.4, conf: 27.8, hca: 12.8 } },
    { title: 'ActiveSciBench-GRN', metric: 'Exact graph accuracy', max: 40, v: { full: 38, mem: 21, ens: 35, conf: 28, hca: 16 } }
  ];

  function renderAblation() {
    VIZ.hPanels(document.getElementById('chart-ablation'), {
      ariaLabel: 'Ablation: removing one component of LLM-AutoSciLab at a time',
      rows: ABL_ROWS,
      labelWidth: 250,
      rowHeight: 30,
      minPanelWidth: 170,
      rightPad: 40,
      panels: ABL.map(function (a) {
        return {
          title: a.title, sub: a.metric + ' (%)', scale: 'linear', domain: [0, a.max], mark: 'bar',
          ticks: a.max === 60 ? [0, 20, 40, 60] : [0, 20, 40],
          get: function (r) { return a.v[r.key]; },
          fmt: function (v) { return (Math.round(v * 10) / 10) + '%'; },
          tipLabel: a.title,
          tipValue: function (v, r) {
            var d = v - a.v.full;
            return (Math.round(v * 10) / 10) + '%' + (r.key === 'full' ? '' : ' (' + (d > 0 ? '+' : '−') + Math.abs(Math.round(d * 10) / 10) + ' pts)');
          }
        };
      }),
      tipTitle: function (r) { return r.label; }
    });
    VIZ.table(document.getElementById('table-ablation'), {
      caption: 'Single-component removal on stratified subsets of each benchmark (Figure 4).',
      columns: [{ key: 'label', label: 'Variant' }].concat(ABL.map(function (a, i) {
        return { key: 'a' + i, label: a.title + ' ' + (a.metric === 'Symbolic accuracy' ? 'SA' : 'Exact'), num: true, better: 'higher',
          fmt: function (v) { return (Math.round(v * 100) / 100) + '%'; } };
      })),
      rows: ABL_ROWS.map(function (r) {
        var o = { label: r.label, _ours: !!r.hl };
        ABL.forEach(function (a, i) { o['a' + i] = a.v[r.key]; });
        return o;
      })
    });
  }

  /* ---------------- Table 4: LLM backbones ---------------- */
  var BACKBONES = [
    { key: 'gpt', label: 'GPT-4o-mini (default)', color: C.s2 },
    { key: 'q4', label: 'Qwen3-4B', color: '#6da7ec' },
    { key: 'q14', label: 'Qwen3-14B', color: '#2a78d6' },
    { key: 'q32', label: 'Qwen3-32B', color: '#104281' }
  ];
  var BB = {
    gpt: [67.60, 81.50, 0.150, 35.09, 50.88, 0.189, 72.49, 31.11, 98.15],
    q4: [57.78, 82.86, 0.174, 12.92, 53.56, 0.3766, 49.56, 21.78, 93.52],
    q14: [54.29, 86.11, 0.127, 23.88, 50.59, 0.1574, 51.19, 22.34, 92.16],
    q32: [60.56, 88.12, 0.101, 25.56, 52.81, 0.0815, 62.70, 25.88, 98.70]
  };
  var BB_ROWS = [
    { key: 'n_sa', label: 'Symbolic accuracy', short: 'Symbolic', group: 'newton', i: 0 },
    { key: 'n_ex', label: 'Exact accuracy', short: 'Exact', group: 'newton', i: 1 },
    { key: 'c_sa', label: 'Symbolic accuracy', short: 'Symbolic', group: 'chem', i: 3 },
    { key: 'c_ex', label: 'Exact accuracy', short: 'Exact', group: 'chem', i: 4 },
    { key: 'g_f1', label: 'Edge F1', group: 'grn', i: 6 },
    { key: 'g_ex', label: 'Exact graph', group: 'grn', i: 7 },
    { key: 'g_sg', label: 'Sign accuracy', short: 'Sign', group: 'grn', i: 8 }
  ];

  function renderBackbones() {
    VIZ.legend(document.getElementById('legend-bb'), BACKBONES.map(function (b) { return { label: b.label, color: b.color, shape: 'dot' }; }));
    VIZ.hPanels(document.getElementById('chart-bb'), {
      ariaLabel: 'LLM-AutoSciLab accuracy with four LLM backbones',
      rows: BB_ROWS,
      groups: { newton: 'NewtonBench', chem: 'ActiveSciBench-Chem', grn: 'ActiveSciBench-GRN' },
      series: BACKBONES,
      labelWidth: 160,
      rowHeight: 28,
      panels: [{
        scale: 'linear', domain: [0, 100], mark: 'multidot', ticks: [0, 25, 50, 75, 100],
        tickFormat: function (t) { return t + '%'; },
        get: function (r) { var o = {}; BACKBONES.forEach(function (b) { o[b.key] = BB[b.key][r.i]; }); return o; },
        fmt: function (v) { return v.toFixed(1) + '%'; }
      }],
      tipTitle: function (r) { return { newton: 'NewtonBench', chem: 'ActiveSciBench-Chem', grn: 'ActiveSciBench-GRN' }[r.group] + ' \u00b7 ' + r.label; }
    });
    var cols = [{ key: 'label', label: 'Backbone' }];
    var labels = ['Newton SA', 'Newton Exact', 'Newton RMSLE', 'Chem SA', 'Chem Exact', 'Chem RMSLE', 'GRN F1', 'GRN Exact', 'GRN Sign'];
    labels.forEach(function (l, i) {
      var better = /RMSLE/.test(l) ? 'lower' : 'higher';
      cols.push({ key: 'b' + i, label: l, num: true, better: better, fmt: function (v) { return /RMSLE/.test(l) ? String(v) : v.toFixed(2); } });
    });
    VIZ.table(document.getElementById('table-bb'), {
      caption: 'LLM backbone comparison (Table 4). Qwen2.5-7B-Instruct remains the small ensemble model in every row.',
      columns: cols,
      rows: BACKBONES.map(function (b) {
        var o = { label: b.label, _ours: b.key === 'gpt' };
        BB[b.key].forEach(function (v, i) { o['b' + i] = v; });
        return o;
      })
    });
  }

  /* ---------------- wiring ---------------- */
  function init() {
    VIZ.segmented(document.getElementById('ctl-bench'), [
      { value: 'newton', label: 'NewtonBench' },
      { value: 'chem', label: 'ActiveSciBench-Chem' },
      { value: 'grn', label: 'ActiveSciBench-GRN' }
    ], state.bench, setBench);
    setBench('newton');
    renderFitVsLaw();
    renderRelative();
    renderAblation();
    renderBackbones();
    VIZ.initLightbox();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
