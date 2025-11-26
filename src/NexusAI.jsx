import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  X,
  ChevronRight,
  Circle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Zap,
  DollarSign,
  BarChart3
} from 'lucide-react';

// Sparkline Component
const Sparkline = ({ data, color = 'emerald' }) => {
  const width = 80;
  const height = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const colorMap = {
    emerald: 'stroke-emerald-500',
    rose: 'stroke-rose-500',
    slate: 'stroke-slate-400'
  };

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        className={`${colorMap[color]} stroke-2`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Dummy Data
const projects = [
  {
    id: 1,
    name: 'Invoice Auto-Reconciler',
    icon: '📄',
    businessUnit: 'Finance',
    status: 'live',
    monthlyROI: 45000,
    totalSavings: 540000,
    invested: 90000,
    sparklineData: [20, 25, 30, 28, 35, 42, 45],
    confidence: 94,
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    lastUpdate: '2h ago',
    timeline: [
      { event: 'Deployment successful', time: '2h ago', type: 'success' },
      { event: 'Performance optimization completed', time: '1d ago', type: 'success' },
      { event: 'Beta testing phase complete', time: '3d ago', type: 'success' }
    ]
  },
  {
    id: 2,
    name: 'Customer Support GenAI',
    icon: '💬',
    businessUnit: 'Operations',
    status: 'live',
    monthlyROI: 82000,
    totalSavings: 984000,
    invested: 120000,
    sparklineData: [45, 52, 58, 62, 68, 75, 82],
    confidence: 97,
    owner: 'Michael Rodriguez',
    ownerInitials: 'MR',
    lastUpdate: '5h ago',
    timeline: [
      { event: 'Handled 10k+ queries this month', time: '5h ago', type: 'success' },
      { event: 'Model fine-tuning completed', time: '2d ago', type: 'success' },
      { event: 'Integration with CRM successful', time: '5d ago', type: 'success' }
    ]
  },
  {
    id: 3,
    name: 'Legal Doc Reviewer',
    icon: '⚖️',
    businessUnit: 'Legal',
    status: 'live',
    monthlyROI: 52000,
    totalSavings: 624000,
    invested: 95000,
    sparklineData: [30, 35, 38, 42, 48, 50, 52],
    confidence: 91,
    owner: 'David Kim',
    ownerInitials: 'DK',
    lastUpdate: '1d ago',
    timeline: [
      { event: 'Processed 500 contracts', time: '1d ago', type: 'success' },
      { event: 'Accuracy improved to 95%', time: '4d ago', type: 'success' },
      { event: 'Go-live deployment', time: '1w ago', type: 'success' }
    ]
  },
  {
    id: 4,
    name: 'Sales Lead Enrichment',
    icon: '🎯',
    businessUnit: 'Sales',
    status: 'beta',
    monthlyROI: 18000,
    totalSavings: 108000,
    invested: 75000,
    sparklineData: [8, 10, 12, 14, 15, 16, 18],
    confidence: 78,
    owner: 'Jessica Wu',
    ownerInitials: 'JW',
    lastUpdate: '3h ago',
    timeline: [
      { event: 'Beta testing with sales team', time: '3h ago', type: 'warning' },
      { event: 'Data integration complete', time: '2d ago', type: 'success' },
      { event: 'Initial setup complete', time: '1w ago', type: 'success' }
    ]
  },
  {
    id: 5,
    name: 'Marketing Copy Generator',
    icon: '✍️',
    businessUnit: 'Marketing',
    status: 'stuck',
    monthlyROI: -5000,
    totalSavings: -30000,
    invested: 85000,
    sparklineData: [12, 10, 8, 6, 4, 2, -5],
    confidence: 52,
    owner: 'Emily Park',
    ownerInitials: 'EP',
    lastUpdate: '2d ago',
    timeline: [
      { event: 'Quality issues identified', time: '2d ago', type: 'error' },
      { event: 'Stakeholder feedback negative', time: '5d ago', type: 'error' },
      { event: 'Pilot launch', time: '2w ago', type: 'warning' }
    ]
  },
  {
    id: 6,
    name: 'Code Review Copilot',
    icon: '👨‍💻',
    businessUnit: 'Engineering',
    status: 'live',
    monthlyROI: 38000,
    totalSavings: 456000,
    invested: 68000,
    sparklineData: [18, 22, 26, 30, 33, 36, 38],
    confidence: 89,
    owner: 'Alex Johnson',
    ownerInitials: 'AJ',
    lastUpdate: '4h ago',
    timeline: [
      { event: 'Reviewed 200+ PRs this week', time: '4h ago', type: 'success' },
      { event: 'Team adoption at 85%', time: '3d ago', type: 'success' },
      { event: 'Production rollout complete', time: '1w ago', type: 'success' }
    ]
  }
];

// Calculate totals
const totalSavings = projects.reduce((sum, p) => sum + p.totalSavings, 0);
const totalSpend = projects.reduce((sum, p) => sum + p.invested, 0);
const activeAgents = projects.filter(p => p.status === 'live').length;
const monthlyImpact = projects.reduce((sum, p) => sum + p.monthlyROI, 0);

const NexusAI = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusConfig = (status) => {
    const configs = {
      live: {
        label: 'Live',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: Circle,
        dotColor: 'text-emerald-500'
      },
      beta: {
        label: 'Beta',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: Circle,
        dotColor: 'text-amber-500'
      },
      stuck: {
        label: 'Stuck',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        icon: Circle,
        dotColor: 'text-rose-500'
      }
    };
    return configs[status];
  };

  const formatCurrency = (value) => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    let formatted;
    if (absValue >= 1000000) {
      formatted = `$${(absValue / 1000000).toFixed(1)}M`;
    } else if (absValue >= 1000) {
      formatted = `$${(absValue / 1000).toFixed(0)}k`;
    } else {
      formatted = `$${absValue}`;
    }
    return isNegative ? `-${formatted}` : `+${formatted}`;
  };

  const formatLargeCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Portfolio Ticker Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Nexus AI</h1>
              <p className="text-sm text-slate-500 mt-1">AI Program Operating System</p>
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors">
              New Agent
            </button>
          </div>

          {/* Main Balance Display */}
          <div className="mb-6">
            <div className="text-sm font-medium text-slate-500 mb-2 tracking-wide">TOTAL ANNUALIZED SAVINGS</div>
            <div className="flex items-baseline gap-3">
              <div className="text-6xl font-semibold text-slate-900 tracking-tight">
                {formatLargeCurrency(totalSavings)}
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-lg font-medium">
                <TrendingUp className="w-5 h-5" />
                <span>{formatCurrency(monthlyImpact)}/mo</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-sm text-slate-500 mb-1">Active Agents</div>
              <div className="text-2xl font-semibold text-slate-900">{activeAgents}</div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="text-sm text-slate-500 mb-1">Total Spend</div>
              <div className="text-2xl font-semibold text-slate-900">{formatLargeCurrency(totalSpend)}</div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="text-sm text-slate-500 mb-1">ROI Multiple</div>
              <div className="text-2xl font-semibold text-slate-900">{(totalSavings / totalSpend).toFixed(1)}x</div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">AI Agents</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;
              const isPositive = project.monthlyROI >= 0;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Icon + Name + Status */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-3xl">{project.icon}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-slate-900 truncate">
                            {project.name}
                          </h3>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                            <StatusIcon className={`w-2 h-2 ${statusConfig.dotColor} fill-current`} />
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500">{project.businessUnit}</div>
                      </div>
                    </div>

                    {/* Middle: Sparkline */}
                    <div className="hidden lg:block px-6">
                      <Sparkline
                        data={project.sparklineData}
                        color={isPositive ? 'emerald' : 'rose'}
                      />
                    </div>

                    {/* Right: ROI + Arrow */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-base font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(project.monthlyROI)}/mo
                        </div>
                        <div className="text-sm text-slate-500">
                          {project.confidence}% confidence
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-out Panel */}
      {selectedProject && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedProject.icon}</div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                      {selectedProject.name}
                    </h2>
                    <p className="text-sm text-slate-500">{selectedProject.businessUnit}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="px-8 py-6 space-y-8">
              {/* Performance Metrics */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Performance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Monthly ROI</div>
                    <div className={`text-2xl font-semibold ${selectedProject.monthlyROI >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {formatCurrency(selectedProject.monthlyROI)}
                    </div>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Total Savings</div>
                    <div className="text-2xl font-semibold text-slate-900">
                      {formatLargeCurrency(selectedProject.totalSavings)}
                    </div>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Invested</div>
                    <div className="text-2xl font-semibold text-slate-900">
                      {formatLargeCurrency(selectedProject.invested)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Confidence Score</h3>
                <div className="p-6 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-5xl font-semibold text-slate-900">{selectedProject.confidence}%</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedProject.confidence >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      selectedProject.confidence >= 75 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {selectedProject.confidence >= 90 ? 'High' : selectedProject.confidence >= 75 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        selectedProject.confidence >= 90 ? 'bg-emerald-500' :
                        selectedProject.confidence >= 75 ? 'bg-amber-500' :
                        'bg-rose-500'
                      }`}
                      style={{ width: `${selectedProject.confidence}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-3">
                    Based on deployment success, user adoption, and performance metrics
                  </p>
                </div>
              </div>

              {/* Project Owner */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Project Owner</h3>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
                    {selectedProject.ownerInitials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{selectedProject.owner}</div>
                    <div className="text-sm text-slate-500">Last update: {selectedProject.lastUpdate}</div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {selectedProject.timeline.map((item, idx) => {
                    const TimelineIcon = item.type === 'success' ? CheckCircle2 :
                                        item.type === 'warning' ? AlertCircle : XCircle;
                    const iconColor = item.type === 'success' ? 'text-emerald-600' :
                                     item.type === 'warning' ? 'text-amber-600' : 'text-rose-600';
                    const bgColor = item.type === 'success' ? 'bg-emerald-50' :
                                   item.type === 'warning' ? 'bg-amber-50' : 'bg-rose-50';

                    return (
                      <div key={idx} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                          <TimelineIcon className={`w-4 h-4 ${iconColor}`} />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="text-sm font-medium text-slate-900">{item.event}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Usage Trend */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">7-Day Trend</h3>
                <div className="p-6 border border-slate-200 rounded-lg">
                  <div className="flex items-end justify-between gap-2 h-32">
                    {selectedProject.sparklineData.map((value, idx) => {
                      const maxValue = Math.max(...selectedProject.sparklineData);
                      const heightPercent = (value / maxValue) * 100;
                      const isPositive = value >= 0;

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="flex-1 flex items-end w-full">
                            <div
                              className={`w-full rounded-t ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                              style={{ height: `${Math.abs(heightPercent)}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-500">D{idx + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-6">
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors">
                  Request Update
                </button>
                <button className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NexusAI;
