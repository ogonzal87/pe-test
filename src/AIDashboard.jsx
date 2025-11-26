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
  Code
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
      color: 'bg-emerald-500'
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
      color: 'bg-blue-500'
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
      color: 'bg-purple-500'
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
      color: 'bg-amber-500'
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
      color: 'bg-pink-500'
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
      color: 'bg-indigo-500'
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
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        label: 'On Track',
        icon: CheckCircle2
      },
      'at-risk': {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        label: 'At Risk',
        icon: AlertCircle
      },
      'blocked': {
        bg: 'bg-rose-100',
        text: 'text-rose-800',
        label: 'Blocked',
        icon: XCircle
      }
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${badge.bg} ${badge.text}`}>
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">AI Program Operating System</h1>
              <p className="text-sm text-slate-500 mt-1">Portfolio-wide AI initiative tracking and ROI analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Export Report
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* North Star Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Active Projects */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-slate-900">{totalProjects}</div>
            <div className="text-sm text-slate-500 mt-1">Total Active Projects</div>
          </div>

          {/* Total Invested */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-slate-900">{formatCompactCurrency(totalInvested)}</div>
            <div className="text-sm text-slate-500 mt-1">Total Invested</div>
          </div>

          {/* Annualized Savings */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-600">{formatCompactCurrency(totalSavings)}</div>
            <div className="text-sm text-slate-500 mt-1">Annualized Savings</div>
          </div>

          {/* Avg ROI Multiplier */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Zap className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-slate-900">{avgROI}x</div>
            <div className="text-sm text-slate-500 mt-1">Avg. ROI Multiplier</div>
          </div>
        </div>

        {/* Master List */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Active AI Projects</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Business Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Net Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{project.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{project.businessUnit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${project.owner.color} flex items-center justify-center text-white text-xs font-medium`}>
                          {project.owner.avatar}
                        </div>
                        <span className="text-sm text-slate-700">{project.owner.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {project.techIcons.map((iconName, idx) => {
                          const Icon = getTechIcon(iconName);
                          return (
                            <div
                              key={idx}
                              className="p-1.5 bg-slate-100 rounded border border-slate-200"
                              title={project.techStack[idx]}
                            >
                              <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`text-sm font-semibold ${project.netValue >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(project.netValue)}
                      </div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    {selectedProject.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(selectedProject.status)}
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      Last updated: {new Date(selectedProject.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* The Job */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">The Job</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{selectedProject.job}</p>
              </div>

              {/* ROI Meter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">ROI Analysis</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Investment</div>
                      <div className="text-lg font-semibold text-slate-900">
                        {formatCurrency(selectedProject.invested)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Annualized Savings</div>
                      <div className="text-lg font-semibold text-emerald-600">
                        {formatCurrency(selectedProject.savings)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">ROI Multiplier</div>
                      <div className={`text-lg font-semibold ${selectedProject.roiMultiplier >= 1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {selectedProject.roiMultiplier.toFixed(1)}x
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span>Cost</span>
                      <span>Value</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${selectedProject.netValue >= 0 ? 'bg-emerald-500' : 'bg-rose-500'} transition-all duration-500`}
                        style={{ width: `${Math.min((selectedProject.savings / (selectedProject.invested + selectedProject.savings)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Net Value</span>
                      <span className={`text-xl font-bold ${selectedProject.netValue >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(selectedProject.netValue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700"
                    >
                      {React.createElement(getTechIcon(selectedProject.techIcons[idx]), {
                        className: "w-4 h-4 text-slate-600"
                      })}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Owner */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Project Owner</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${selectedProject.owner.color} flex items-center justify-center text-white text-sm font-medium`}>
                    {selectedProject.owner.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{selectedProject.owner.name}</div>
                    <div className="text-sm text-slate-500">{selectedProject.businessUnit}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Request Update
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
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
