import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  X,
  User,
  Calendar,
  Target,
  BarChart3,
  FileText,
  Bell,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Zap,
  Database,
  MessageSquare,
  FileImage,
  Brain,
  Code,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// Dummy Data
const projects = [
  {
    id: 1,
    name: 'Invoice Processing Agent',
    businessUnit: 'FinServ Portfolio Co A',
    owner: {
      name: 'Sarah Chen',
      avatar: 'SC',
      gradient: 'from-emerald-400 to-teal-500'
    },
    status: 'on-track',
    techStack: ['OpenAI GPT-4', 'LangChain', 'PostgreSQL'],
    techIcons: ['Brain', 'Code', 'Database'],
    netValue: 425000,
    invested: 85000,
    savings: 510000,
    job: 'Automate extraction and validation of invoice data from PDFs to reduce manual data entry by 90%',
    lastUpdated: '2025-11-20',
    roiMultiplier: 6.0
  },
  {
    id: 2,
    name: 'Customer Support L1 Bot',
    businessUnit: 'E-Commerce Co',
    owner: {
      name: 'Michael Rodriguez',
      avatar: 'MR',
      gradient: 'from-blue-400 to-indigo-500'
    },
    status: 'on-track',
    techStack: ['Anthropic Claude', 'Pinecone', 'FastAPI'],
    techIcons: ['MessageSquare', 'Database', 'Code'],
    netValue: 890000,
    invested: 125000,
    savings: 1015000,
    job: 'Handle tier-1 customer inquiries automatically, deflecting 70% of support tickets and reducing response time',
    lastUpdated: '2025-11-22',
    roiMultiplier: 8.1
  },
  {
    id: 3,
    name: 'Marketing Copy Generator',
    businessUnit: 'Consumer Goods Co',
    owner: {
      name: 'Emily Park',
      avatar: 'EP',
      gradient: 'from-purple-400 to-pink-500'
    },
    status: 'at-risk',
    techStack: ['OpenAI GPT-4', 'Midjourney API', 'Airtable'],
    techIcons: ['Brain', 'FileImage', 'Database'],
    netValue: 145000,
    invested: 95000,
    savings: 240000,
    job: 'Generate on-brand product descriptions and social media content at scale to reduce agency costs',
    lastUpdated: '2025-11-15',
    roiMultiplier: 2.5
  },
  {
    id: 4,
    name: 'Contract Review Assistant',
    businessUnit: 'Legal Tech Co',
    owner: {
      name: 'David Kim',
      avatar: 'DK',
      gradient: 'from-amber-400 to-orange-500'
    },
    status: 'on-track',
    techStack: ['OpenAI GPT-4', 'LangChain', 'ChromaDB'],
    techIcons: ['Brain', 'Code', 'Database'],
    netValue: 625000,
    invested: 110000,
    savings: 735000,
    job: 'Accelerate contract review process by flagging non-standard clauses and risk areas for legal team',
    lastUpdated: '2025-11-23',
    roiMultiplier: 6.7
  },
  {
    id: 5,
    name: 'Sales Lead Enrichment',
    businessUnit: 'SaaS Portfolio Co B',
    owner: {
      name: 'Jessica Wu',
      avatar: 'JW',
      gradient: 'from-pink-400 to-rose-500'
    },
    status: 'blocked',
    techStack: ['OpenAI GPT-4', 'Clearbit API', 'Salesforce'],
    techIcons: ['Brain', 'Database', 'Code'],
    netValue: -35000,
    invested: 75000,
    savings: 40000,
    job: 'Automatically enrich and score inbound leads using AI to prioritize sales team outreach',
    lastUpdated: '2025-11-10',
    roiMultiplier: 0.5
  },
  {
    id: 6,
    name: 'Code Review Copilot',
    businessUnit: 'Healthcare Tech Co',
    owner: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      gradient: 'from-indigo-400 to-purple-500'
    },
    status: 'on-track',
    techStack: ['GitHub Copilot', 'SonarQube', 'Jenkins'],
    techIcons: ['Code', 'Brain', 'Database'],
    netValue: 380000,
    invested: 65000,
    savings: 445000,
    job: 'Assist engineers with automated code reviews to identify bugs and security vulnerabilities early',
    lastUpdated: '2025-11-24',
    roiMultiplier: 6.8
  }
];

// Calculate aggregate metrics
const totalProjects = projects.length;
const totalInvested = projects.reduce((sum, p) => sum + p.invested, 0);
const totalSavings = projects.reduce((sum, p) => sum + p.savings, 0);
const avgROI = (totalSavings / totalInvested).toFixed(1);

const AIDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusBadge = (status) => {
    const badges = {
      'on-track': {
        bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        text: 'text-white',
        label: 'On Track',
        icon: CheckCircle2,
        glow: 'shadow-emerald-500/20'
      },
      'at-risk': {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
        text: 'text-white',
        label: 'At Risk',
        icon: AlertCircle,
        glow: 'shadow-amber-500/20'
      },
      'blocked': {
        bg: 'bg-gradient-to-r from-rose-500 to-pink-500',
        text: 'text-white',
        label: 'Blocked',
        icon: XCircle,
        glow: 'shadow-rose-500/20'
      }
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} shadow-lg ${badge.glow}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const getTechIcon = (iconName) => {
    const icons = {
      Brain,
      Code,
      Database,
      MessageSquare,
      FileImage
    };
    return icons[iconName] || Code;
  };

  const formatCurrency = (value) => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(absValue);
    return isNegative ? `-${formatted}` : formatted;
  };

  const formatCompactCurrency = (value) => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    let formatted;
    if (absValue >= 1000000) {
      formatted = `$${(absValue / 1000000).toFixed(1)}M`;
    } else if (absValue >= 1000) {
      formatted = `$${(absValue / 1000).toFixed(0)}K`;
    } else {
      formatted = `$${absValue}`;
    }
    return isNegative ? `-${formatted}` : formatted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                  AI Program OS
                </h1>
              </div>
              <p className="text-sm text-slate-600 ml-14">Portfolio-wide AI initiative tracking and ROI analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
                Export Report
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-10">
        {/* North Star Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {/* Total Active Projects */}
          <div className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {totalProjects}
              </div>
              <div className="text-sm font-medium text-slate-600">Total Active Projects</div>
            </div>
          </div>

          {/* Total Invested */}
          <div className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {formatCompactCurrency(totalInvested)}
              </div>
              <div className="text-sm font-medium text-slate-600">Total Invested</div>
            </div>
          </div>

          {/* Annualized Savings */}
          <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/30 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-white/90 text-sm font-semibold">
                  <ArrowUpRight className="w-4 h-4" />
                  ROI+
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {formatCompactCurrency(totalSavings)}
              </div>
              <div className="text-sm font-medium text-emerald-100">Annualized Savings</div>
            </div>
          </div>

          {/* Avg ROI Multiplier */}
          <div className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
                {avgROI}x
              </div>
              <div className="text-sm font-medium text-slate-600">Avg. ROI Multiplier</div>
            </div>
          </div>
        </div>

        {/* Master List */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Active AI Projects</h2>
                <p className="text-sm text-slate-600 mt-1">{projects.length} projects delivering value across portfolio</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all">
                  Filter
                </button>
                <button className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all">
                  Sort
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Business Unit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th className="px-8 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Net Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 cursor-pointer transition-all duration-200"
                  >
                    <td className="px-8 py-5">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {project.name}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-slate-600 font-medium">{project.businessUnit}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${project.owner.gradient} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                          {project.owner.avatar}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{project.owner.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {project.techIcons.map((iconName, idx) => {
                          const Icon = getTechIcon(iconName);
                          return (
                            <div
                              key={idx}
                              className="p-2 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
                              title={project.techStack[idx]}
                            >
                              <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className={`text-base font-bold ${project.netValue >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(project.netValue)}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{project.roiMultiplier.toFixed(1)}x ROI</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Project Report Card Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative px-8 py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-slate-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30" />
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProject.owner.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                      {selectedProject.owner.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        {selectedProject.name}
                      </h2>
                      <p className="text-sm text-slate-600">{selectedProject.businessUnit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-0.5">
                    {getStatusBadge(selectedProject.status)}
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar className="w-4 h-4" />
                      Updated {new Date(selectedProject.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-3 hover:bg-white/80 rounded-xl transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-300px)]">
              {/* The Job */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Mission</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-base">{selectedProject.job}</p>
              </div>

              {/* ROI Meter */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/20">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">ROI Performance</h3>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200 shadow-inner">
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Investment</div>
                      <div className="text-2xl font-bold text-slate-900">
                        {formatCurrency(selectedProject.invested)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Annual Savings</div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(selectedProject.savings)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">ROI Multiplier</div>
                      <div className={`text-2xl font-bold ${selectedProject.roiMultiplier >= 1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {selectedProject.roiMultiplier.toFixed(1)}x
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative mb-6">
                    <div className="flex justify-between text-xs text-slate-600 font-semibold mb-3">
                      <span>Cost</span>
                      <span>Value Generated</span>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full ${selectedProject.netValue >= 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-pink-500'} transition-all duration-500 shadow-lg`}
                        style={{ width: `${Math.min((selectedProject.savings / (selectedProject.invested + selectedProject.savings)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Net Value Created</span>
                      <span className={`text-3xl font-bold ${selectedProject.netValue >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(selectedProject.netValue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/20">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Technology Stack</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      {React.createElement(getTechIcon(selectedProject.techIcons[idx]), {
                        className: "w-4 h-4 text-indigo-600"
                      })}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Owner */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg shadow-purple-500/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Project Lead</h3>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProject.owner.gradient} flex items-center justify-center text-white text-base font-bold shadow-lg`}>
                    {selectedProject.owner.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{selectedProject.owner.name}</div>
                    <div className="text-sm text-slate-600 font-medium">{selectedProject.businessUnit}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center gap-4">
              <button className="flex-1 px-6 py-3.5 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Request Update
              </button>
              <button className="flex-1 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                View Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDashboard;
