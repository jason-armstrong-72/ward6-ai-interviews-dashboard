import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, Legend, ComposedChart } from 'recharts';
import { Users, Clock, TrendingUp, AlertTriangle, Target, ChevronDown, ChevronUp, Quote, Zap, Shield, DollarSign, Lightbulb, X } from 'lucide-react';

const colors = {
  primary: '#1a1f2e',
  secondary: '#2d3548',
  accent: '#00b894',
  accentLight: '#00cec9',
  warning: '#fdcb6e',
  danger: '#e17055',
  text: '#ffffff',
  textMuted: '#a0aec0',
  cardBg: '#242a3d',
  border: '#3d4663'
};

const surveyData = {
  usageFrequency: [
    { name: 'Not at all', value: 4, color: colors.danger },
    { name: '~1 hr/week', value: 18, color: colors.warning },
    { name: '~1 hr/day', value: 24, color: colors.accentLight },
    { name: '2-4 hrs/day', value: 9, color: colors.accent }
  ],
  skillLevels: [
    { name: 'Beginner', value: 12, color: colors.danger },
    { name: 'Intermediate', value: 32, color: colors.warning },
    { name: 'Advanced', value: 11, color: colors.accent }
  ],
  departments: [
    { name: 'Account Service', count: 14, readiness: 6.5, timeSavings: '3-8 hrs/wk', roiRationale: 'Large team, multiple touch points, efficiency gains' },
    { name: 'Medical', count: 8, readiness: 6.5, timeSavings: '2-10 hrs/wk', roiRationale: 'High volume, clear use cases, significant time savings' },
    { name: 'Creative', count: 5, readiness: 6.5, timeSavings: '1-5 hrs/wk', roiRationale: 'Existing tool adoption, enhancement opportunities' },
    { name: 'Studio', count: 3, readiness: 6.5, timeSavings: '1-4 hrs/wk', roiRationale: 'Existing tool adoption, enhancement opportunities' },
    { name: 'Strategy', count: 2, readiness: 7.5, timeSavings: '2-12 hrs/wk', roiRationale: 'High-value work, pitch impact, competitive advantage' },
    { name: 'Media & CX', count: 3, readiness: 7.5, timeSavings: '1-4 hrs/wk', roiRationale: 'Growing function, research-heavy' },
    { name: 'Ops/Finance', count: 4, readiness: 4, timeSavings: '0.5-2 hrs/wk', roiRationale: 'Lower immediate ROI but compliance benefits' },
    { name: 'Leadership', count: 1, readiness: 7, timeSavings: 'Variable', roiRationale: 'Strategic oversight and direction' }
  ],
  trainingPreferences: [
    { name: 'Group Workshops', value: 42, description: 'Small groups (4-8 people) preferred' },
    { name: 'Online Courses', value: 38, description: 'Self-paced learning modules' },
    { name: 'One-on-One Training', value: 28, description: 'Personalised sessions for specific needs' }
  ],
  toolsUsed: [
    { name: 'ChatGPT', usage: 48 },
    { name: 'Fireflies', usage: 35 },
    { name: 'Adobe Firefly', usage: 22 },
    { name: 'Copilot (M365)', usage: 15 },
    { name: 'Midjourney', usage: 8 },
    { name: 'Excel/Sheets AI', usage: 8 },
    { name: 'Claude', usage: 5 },
    { name: 'Gemini', usage: 5 },
    { name: 'DALL·E', usage: 4 },
    { name: 'Perplexity', usage: 3 },
    { name: 'Otter.ai', usage: 3 },
    { name: 'Consensus', usage: 2 }
  ],
  toolsRequested: [
    { name: 'Tome/Gamma', category: 'Presentations', mentions: 5 },
    { name: 'Google Veo 3', category: 'Video Generation', mentions: 4 },
    { name: 'Runway', category: 'Video Generation', mentions: 3 },
    { name: 'SecureCHEK.AI', category: 'Healthcare Compliance', mentions: 2 },
    { name: 'Stable Diffusion', category: 'Image Generation', mentions: 2 },
    { name: 'Motion', category: 'Task Management', mentions: 2 },
    { name: 'Creatopy', category: 'Ad Automation', mentions: 1 }
  ]
};

const quotes = [
  { text: "We want to have a sense of where we are now — so we can work out where we want to get to — and then how to get there.", author: "Stuart Black", role: "CEO, TWMG", category: "vision" },
  { text: "It's faster, but that doesn't mean that you get more time to think about it or to iterate it or refine it afterwards; it just means that the end client thinks it takes half the time, and then you're expected to do twice as much work.", author: "Holly Philip", role: "Creative, Ward7", category: "efficiency" },
  { text: "Capabilities beyond what we traditionally think of as AI. I think AI has a much broader scope than we all take at first glance. There's so much more behind it other than getting it to write some emails for us or take notes.", author: "Robbie Lang", role: "Account Service, Ward6", category: "knowledge" },
  { text: "I go into it with a huge amount of skepticism. I don't trust anything that comes out of it, so I have to double check everything, because as you know, it hallucinates a lot and lies a lot.", author: "Medical Writer", role: "Medical Team", category: "trust" },
  { text: "We need to safeguard ourselves and the business, not to put ourselves in an ethical dilemma or a legal dilemma.", author: "Linnea Mitchell-Taverner", role: "Engagement Ward", category: "compliance" },
  { text: "AI is just amazing because of the literature reviews it can do. Quick. The vast knowledge or access it has is just incredible.", author: "Trevor Sills", role: "Strategy, Ward6", category: "value" },
  { text: "I would like if I could use it more to help write briefs... I always spend time, I think it's such a waste of time every time I write a brief, I populate who's the account manager, who's the creative, what the hours from the estimate are...", author: "Tash Hoare", role: "Account Director, Ward6", category: "automation" },
  { text: "I would be building relationships with the clients—getting time to talk to them more, going out to see them. That, and also probably upskilling the team.", author: "Deanne Hvala-Granger", role: "Account Service, Ward6", category: "value" }
];

const keyThemes = [
  { id: 'trust', name: 'Trust Spectrum', icon: Shield, description: 'High trust for emails/notes, low trust for medical claims', severity: 'medium' },
  { id: 'efficiency', name: 'Efficiency Paradox', icon: Clock, description: 'AI speeds work but client expectations inflate proportionally', severity: 'high' },
  { id: 'knowledge', name: 'Knowledge Gap', icon: Lightbulb, description: '"Not knowing what we don\'t know" — staff want broader education', severity: 'medium' },
  { id: 'accounts', name: 'Personal vs Company', icon: AlertTriangle, description: 'Staff using personal accounts creates compliance risk', severity: 'high' },
  { id: 'presentations', name: 'Presentation Problem', icon: Target, description: 'Slide deck creation is #1 requested AI improvement', severity: 'medium' }
];

const priorityTasks = [
  { task: 'Slide deck creation', mentions: 15, departments: ['All'], impact: 'High' },
  { task: 'Veeva uploads & linking', mentions: 12, departments: ['Medical', 'Account Service'], impact: 'High' },
  { task: 'Email drafting/refinement', mentions: 11, departments: ['All'], impact: 'Medium' },
  { task: 'Research summaries', mentions: 10, departments: ['Medical', 'Strategy'], impact: 'High' },
  { task: 'Brief writing automation', mentions: 9, departments: ['Account Service'], impact: 'Medium' },
  { task: 'Reference housekeeping', mentions: 8, departments: ['Medical'], impact: 'High' },
  { task: 'Contact reports from Fireflies', mentions: 7, departments: ['Account Service'], impact: 'Medium' }
];

const roadmap = {
  immediate: [
    { action: 'Publish AI Usage Policy', owner: 'CEO + SLT', kpi: '100% staff acknowledgment' },
    { action: 'Rationalise ChatGPT Accounts', owner: 'IT/Ops', kpi: 'Individual licenses deployed' },
    { action: 'Schedule Foundation Training', owner: 'HR', kpi: 'All staff complete Tier 1' },
    { action: 'Identify AI Champions', owner: 'Dept Heads', kpi: '1 champion per department' }
  ],
  shortTerm: [
    { action: 'Launch Presentation Tool Pilot', owner: 'Studio + Medical', kpi: '25-40% time reduction per deck' },
    { action: 'Develop Role-Specific Playbooks', owner: 'Champions', kpi: '2 playbooks per month' },
    { action: 'Implement Fireflies Improvements', owner: 'Account Service', kpi: 'Contact report automation' },
    { action: 'Begin Medical Writing Pilots', owner: 'Medical Lead', kpi: 'Reference GPT deployed' }
  ],
  mediumTerm: [
    { action: 'Veeva Integration Scoping', owner: 'IT + Medical', kpi: 'Feasibility report delivered' },
    { action: 'Advanced Training Programme', owner: 'HR + Champions', kpi: 'Tier 3 completion rate' },
    { action: 'Client AI Positioning', owner: 'Strategy', kpi: 'AI services launched' },
    { action: 'Measure and Report ROI', owner: 'Finance', kpi: 'Quarterly dashboard live' }
  ]
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '12px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <p style={{ color: colors.text, fontWeight: 600, marginBottom: '4px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color || colors.accent, fontSize: '14px' }}>{entry.name}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon: Icon, title, value, subtitle, color = colors.accent }) => (
  <div style={{ background: `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.secondary} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, borderRadius: '50%' }} />
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</p>
        <p style={{ color: colors.text, fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>{value}</p>
        {subtitle && <p style={{ color: colors.textMuted, fontSize: '14px' }}>{subtitle}</p>}
      </div>
      <div style={{ background: `${color}20`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} color={color} />
      </div>
    </div>
  </div>
);

const QuoteCarousel = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const filteredQuotes = filter === 'all' ? quotes : quotes.filter(q => q.category === filter);
  const categories = ['all', ...new Set(quotes.map(q => q.category))];
  
  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.accent}15 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '32px', border: `1px solid ${colors.accent}30` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Quote size={24} color={colors.accent} />
        <span style={{ color: colors.text, fontSize: '18px', fontWeight: 600 }}>Staff Voices</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => { setFilter(cat); setCurrentIndex(0); }} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: filter === cat ? colors.accent : colors.secondary, color: filter === cat ? colors.primary : colors.textMuted, fontSize: '12px', cursor: 'pointer', textTransform: 'capitalize' }}>{cat}</button>
        ))}
      </div>
      {filteredQuotes.length > 0 && (
        <>
          <p style={{ color: colors.text, fontSize: '18px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '16px', minHeight: '100px' }}>"{filteredQuotes[currentIndex].text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: colors.accent, fontWeight: 600 }}>{filteredQuotes[currentIndex].author}</p>
              <p style={{ color: colors.textMuted, fontSize: '14px' }}>{filteredQuotes[currentIndex].role}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {filteredQuotes.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)} style={{ width: '10px', height: '10px', borderRadius: '50%', border: 'none', background: idx === currentIndex ? colors.accent : colors.border, cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function TWMGDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRoadmapDetail, setShowRoadmapDetail] = useState(null);
  const tabs = [
    { id: 'overview', label: 'Executive Summary' },
    { id: 'departments', label: 'Department Analysis' },
    { id: 'insights', label: 'Key Insights' },
    { id: 'roadmap', label: 'Implementation Roadmap' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${colors.primary} 0%, #0f1219 100%)`, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: colors.text }}>
      <header style={{ background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, borderBottom: `1px solid ${colors.border}`, padding: '24px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px', color: colors.primary }}>W6</div>
                <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>AI Transformation Dashboard</h1>
              </div>
              <p style={{ color: colors.textMuted, fontSize: '14px', margin: 0 }}>Ward Marketing Group • January 2026 • Prepared for Stuart Black, CEO</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: colors.accent, fontSize: '24px', fontWeight: 700, margin: 0 }}>27</p>
              <p style={{ color: colors.textMuted, fontSize: '12px', margin: 0 }}>Interviews Conducted</p>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '8px' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 24px', borderRadius: '8px 8px 0 0', border: 'none', background: activeTab === tab.id ? colors.cardBg : 'transparent', color: activeTab === tab.id ? colors.accent : colors.textMuted, fontSize: '14px', fontWeight: activeTab === tab.id ? 600 : 400, cursor: 'pointer', borderBottom: activeTab === tab.id ? `2px solid ${colors.accent}` : '2px solid transparent' }}>{tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px' }}>
        {activeTab === 'overview' && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.cardBg} 50%, ${colors.accent}05 100%)`, borderRadius: '20px', padding: '40px', marginBottom: '32px', border: `1px solid ${colors.accent}30`, textAlign: 'center' }}>
              <Quote size={40} color={colors.accent} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p style={{ fontSize: '24px', fontWeight: 300, lineHeight: 1.5, marginBottom: '16px', maxWidth: '800px', margin: '0 auto 16px' }}>"We want to have a sense of where we are now — so we can work out where we want to get to — and then how to get there."</p>
              <p style={{ color: colors.accent, fontWeight: 600 }}>Stuart Black, CEO</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <StatCard icon={Users} title="Staff Interviewed" value="27" subtitle="Across 9 departments" color={colors.accent} />
              <StatCard icon={Users} title="Survey Responses" value="55" subtitle="Staff survey Aug 2025" color={colors.accentLight} />
              <StatCard icon={Clock} title="Avg Daily AI Usage" value="1hr" subtitle="Most common frequency" color={colors.warning} />
              <StatCard icon={TrendingUp} title="Avg Readiness" value="6.3" subtitle="Out of 10" color={colors.accent} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>AI Usage Frequency</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart><Pie data={surveyData.usageFrequency} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">{surveyData.usageFrequency.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip content={<CustomTooltip />} /></PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
                  {surveyData.usageFrequency.map((item, idx) => (<div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} /><span style={{ fontSize: '12px', color: colors.textMuted }}>{item.name}</span></div>))}
                </div>
              </div>
              <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Self-Reported Skill Levels</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={surveyData.skillLevels} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} /><XAxis type="number" stroke={colors.textMuted} /><YAxis dataKey="name" type="category" stroke={colors.textMuted} width={100} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="value" radius={[0, 8, 8, 0]}>{surveyData.skillLevels.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Bar></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', fontWeight: 600 }}>The Problems We're Solving</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: `linear-gradient(135deg, ${colors.danger}15 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.danger}30` }}><DollarSign size={32} color={colors.danger} style={{ marginBottom: '12px' }} /><h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Inefficient Investment Risk</h4><ul style={{ color: colors.textMuted, fontSize: '14px', lineHeight: 1.6, paddingLeft: '16px', margin: 0 }}><li>Wrong tools for wrong people</li><li>Overlapping licenses</li><li>Low ROI on training</li></ul></div>
              <div style={{ background: `linear-gradient(135deg, ${colors.warning}15 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.warning}30` }}><Shield size={32} color={colors.warning} style={{ marginBottom: '12px' }} /><h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Compliance Risk</h4><ul style={{ color: colors.textMuted, fontSize: '14px', lineHeight: 1.6, paddingLeft: '16px', margin: 0 }}><li>Non-approved tools with client data</li><li>TGA/MA violation potential</li><li>Personal accounts for work</li></ul></div>
              <div style={{ background: `linear-gradient(135deg, ${colors.accent}15 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.accent}30` }}><Zap size={32} color={colors.accent} style={{ marginBottom: '12px' }} /><h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Competitive Disadvantage</h4><ul style={{ color: colors.textMuted, fontSize: '14px', lineHeight: 1.6, paddingLeft: '16px', margin: 0 }}><li>Slower than competitors</li><li>Talent attraction challenges</li><li>Manual vs automated processes</li></ul></div>
            </div>
            <QuoteCarousel quotes={quotes} />
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Department Readiness & Team Size</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={surveyData.departments}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="name" stroke={colors.textMuted} angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis yAxisId="left" stroke={colors.textMuted} domain={[0, 10]} label={{ value: 'Readiness Score (out of 10)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: colors.textMuted, fontSize: 12 } }} />
                  <YAxis yAxisId="right" orientation="right" stroke={colors.warning} domain={[0, 20]} label={{ value: 'Staff Interviewed', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: colors.warning, fontSize: 12 } }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} formatter={(value) => <span style={{ color: colors.textMuted }}>{value}</span>} />
                  <Bar yAxisId="left" dataKey="readiness" fill={colors.accent} radius={[8, 8, 0, 0]} name="Readiness Score (out of 10)" />
                  <Line yAxisId="right" type="monotone" dataKey="count" stroke={colors.warning} strokeWidth={3} name="Staff Interviewed" dot={{ fill: colors.warning, r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>Department Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
              {surveyData.departments.map((dept, idx) => (
                <div key={idx} style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div><h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{dept.name}</h4><p style={{ color: colors.textMuted, fontSize: '14px' }}>{dept.count} staff interviewed</p></div>
                    <div style={{ background: dept.readiness >= 7 ? `${colors.accent}20` : dept.readiness >= 5 ? `${colors.warning}20` : `${colors.danger}20`, color: dept.readiness >= 7 ? colors.accent : dept.readiness >= 5 ? colors.warning : colors.danger, padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '18px' }}>{dept.readiness}/10</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}><p style={{ color: colors.textMuted, fontSize: '12px', marginBottom: '4px' }}>Time Savings Potential</p><p style={{ color: colors.text, fontWeight: 600 }}>{dept.timeSavings}</p></div>
                  <div style={{ background: colors.secondary, padding: '12px', borderRadius: '8px', fontSize: '13px', color: colors.textMuted }}>{dept.roiRationale}</div>
                </div>
              ))}
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>Estimated Weekly Time Savings by Department</h3>
              <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '20px' }}>Based on interview estimates of potential time savings if AI were effectively implemented</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: `1px solid ${colors.border}` }}><th style={{ textAlign: 'left', padding: '12px', color: colors.textMuted, fontSize: '12px', textTransform: 'uppercase' }}>Department</th><th style={{ textAlign: 'center', padding: '12px', color: colors.textMuted, fontSize: '12px', textTransform: 'uppercase' }}>Conservative</th><th style={{ textAlign: 'center', padding: '12px', color: colors.textMuted, fontSize: '12px', textTransform: 'uppercase' }}>Optimistic</th></tr></thead>
                <tbody>
                  {[{ dept: 'Medical Writing', conservative: '2-4 hours', optimistic: '5-10 hours' },{ dept: 'Account Service', conservative: '3-5 hours', optimistic: '6-8 hours' },{ dept: 'Strategy', conservative: '2-4 hours', optimistic: '6-12 hours (pitch work)' },{ dept: 'Creative', conservative: '1-3 hours', optimistic: '3-5 hours' },{ dept: 'Studio', conservative: '1-2 hours', optimistic: '2-4 hours' },{ dept: 'Media & CX', conservative: '1-2 hours', optimistic: '2-4 hours' },{ dept: 'Ops/Finance', conservative: '0.5-1 hours', optimistic: '1-2 hours' }].map((row, idx) => (<tr key={idx} style={{ borderBottom: `1px solid ${colors.border}` }}><td style={{ padding: '12px', fontWeight: 500 }}>{row.dept}</td><td style={{ padding: '12px', textAlign: 'center', color: colors.textMuted }}>{row.conservative}</td><td style={{ padding: '12px', textAlign: 'center', color: colors.accent }}>{row.optimistic}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', fontWeight: 600 }}>Cross-Department Themes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {keyThemes.map((theme, idx) => (
                <div key={idx} style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${theme.severity === 'high' ? colors.warning : colors.border}`, display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: theme.severity === 'high' ? `${colors.warning}20` : `${colors.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><theme.icon size={24} color={theme.severity === 'high' ? colors.warning : colors.accent} /></div>
                  <div><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><h4 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{theme.name}</h4>{theme.severity === 'high' && (<span style={{ background: colors.warning, color: colors.primary, padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>KEY ISSUE</span>)}</div><p style={{ color: colors.textMuted, fontSize: '14px', margin: 0 }}>{theme.description}</p></div>
                </div>
              ))}
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Top Tasks Identified for AI Automation</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {priorityTasks.map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: colors.secondary, borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span style={{ width: '32px', height: '32px', borderRadius: '8px', background: task.impact === 'High' ? colors.accent : colors.warning, color: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>{task.mentions}</span><div><p style={{ fontWeight: 600, marginBottom: '2px' }}>{task.task}</p><p style={{ color: colors.textMuted, fontSize: '12px', margin: 0 }}>{task.departments.join(', ')}</p></div></div>
                    <span style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, background: task.impact === 'High' ? `${colors.accent}20` : `${colors.warning}20`, color: task.impact === 'High' ? colors.accent : colors.warning }}>{task.impact} Impact</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 600 }}>Current Tool Landscape</h3>
              <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '20px' }}>Tools currently in use across TWMG based on survey and interview data</p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={surveyData.toolsUsed} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={true} horizontal={false} /><XAxis type="number" stroke={colors.textMuted} /><YAxis dataKey="name" type="category" stroke={colors.textMuted} width={120} fontSize={12} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="usage" fill={colors.accent} radius={[0, 8, 8, 0]} name="Users" /></BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Writing/Chat', 'Images/Video', 'Meetings/Notes', 'Research', 'Data/Code'].map((cat, idx) => (<div key={idx} style={{ padding: '6px 12px', background: colors.secondary, borderRadius: '6px', fontSize: '12px', color: colors.textMuted }}>{cat}</div>))}
              </div>
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 600 }}>Tools Requested or Mentioned</h3>
              <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '20px' }}>Tools staff have requested training on or mentioned as possibilities</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {surveyData.toolsRequested.map((tool, idx) => (
                  <div key={idx} style={{ background: colors.secondary, padding: '16px', borderRadius: '12px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                    <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>{tool.name}</p>
                    <p style={{ color: colors.textMuted, fontSize: '11px', marginBottom: '8px' }}>{tool.category}</p>
                    <span style={{ background: `${colors.accent}20`, color: colors.accent, padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>{tool.mentions} mention{tool.mentions > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 600 }}>Training Format Preferences</h3>
              <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '20px' }}>From survey responses (55 respondents) — respondents could select multiple options</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={surveyData.trainingPreferences} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} /><XAxis type="number" stroke={colors.textMuted} /><YAxis dataKey="name" type="category" stroke={colors.textMuted} width={140} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="value" fill={colors.accentLight} radius={[0, 8, 8, 0]} name="Respondents" /></BarChart>
                </ResponsiveContainer>
                <div>
                  {surveyData.trainingPreferences.map((pref, idx) => (
                    <div key={idx} style={{ padding: '16px', background: colors.secondary, borderRadius: '12px', marginBottom: '12px', border: `1px solid ${colors.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}><span style={{ fontWeight: 600 }}>{pref.name}</span><span style={{ background: `${colors.accent}20`, color: colors.accent, padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 700 }}>{pref.value}</span></div>
                      <p style={{ color: colors.textMuted, fontSize: '13px', margin: 0 }}>{pref.description}</p>
                    </div>
                  ))}
                  <div style={{ padding: '16px', background: `${colors.accent}10`, borderRadius: '12px', border: `1px solid ${colors.accent}30` }}><p style={{ fontSize: '13px', color: colors.text, margin: 0 }}><strong>Recommendation:</strong> Small group workshops (4-8 people) emerged as the preferred primary format, with online courses for foundational learning and one-on-one sessions for specific needs.</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              {[{ label: 'Immediate', period: '0-30 days', color: colors.accent, items: roadmap.immediate },{ label: 'Short-Term', period: '60-90 days', color: colors.accentLight, items: roadmap.shortTerm },{ label: 'Medium-Term', period: '6 months', color: colors.warning, items: roadmap.mediumTerm }].map((phase, idx) => (
                <div key={idx} style={{ flex: 1 }}>
                  <div style={{ background: `linear-gradient(135deg, ${phase.color}20 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${phase.color}30`, height: '100%' }}>
                    <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '4px', background: phase.color, color: colors.primary, fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>{phase.period}</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>{phase.label}</h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {phase.items.map((item, itemIdx) => (
                        <div key={itemIdx} onClick={() => setShowRoadmapDetail(item)} style={{ background: colors.secondary, borderRadius: '12px', padding: '16px', border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                          <p style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>{item.action}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: colors.textMuted, fontSize: '12px' }}>{item.owner}</span><span style={{ color: phase.color, fontSize: '11px' }}>View KPI →</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Project Success Criteria</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[{ title: 'Clear Investment Strategy', desc: 'Data-driven plan for AI budget with expected ROI per decision' },{ title: 'Risk Mitigation', desc: 'Compliance framework for TGA/MA, client policies, and safeguards' },{ title: 'Actionable Roadmap', desc: 'Specific next steps with timelines, ownership, and pilot projects' },{ title: 'Team Buy-in', desc: 'Strategy for non-users and advancing current users, with champions' },{ title: 'Success Measurement', desc: 'Defined metrics to track ROI, adoption, and guide future investments' },{ title: 'Client AI Positioning', desc: 'Clear strategy for communicating AI capabilities to clients' }].map((criteria, idx) => (
                  <div key={idx} style={{ padding: '20px', background: colors.secondary, borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${colors.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}><Target size={16} color={colors.accent} /></div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{criteria.title}</h4>
                    <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{criteria.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.cardBg} 100%)`, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.accent}30` }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>Strategic Considerations</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {['Balance Efficiency with Quality','Protect Creative Value','Build Client Trust','Maintain Human Connection','Stay Adaptable'].map((consideration, idx) => (
                  <div key={idx} style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.accent, color: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, margin: '0 auto 12px' }}>{idx + 1}</div>
                    <p style={{ fontSize: '13px', fontWeight: 500, margin: 0 }}>{consideration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {showRoadmapDetail && (
        <div onClick={() => setShowRoadmapDetail(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: colors.cardBg, borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '90%', border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}><h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>{showRoadmapDetail.action}</h3><button onClick={() => setShowRoadmapDetail(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={20} color={colors.textMuted} /></button></div>
            <div style={{ marginBottom: '16px' }}><p style={{ color: colors.textMuted, fontSize: '12px', marginBottom: '4px' }}>Owner</p><p style={{ fontWeight: 600 }}>{showRoadmapDetail.owner}</p></div>
            <div><p style={{ color: colors.textMuted, fontSize: '12px', marginBottom: '4px' }}>Key Performance Indicator</p><div style={{ background: `${colors.accent}20`, padding: '16px', borderRadius: '8px', border: `1px solid ${colors.accent}30` }}><p style={{ color: colors.accent, fontWeight: 600, margin: 0 }}>{showRoadmapDetail.kpi}</p></div></div>
          </div>
        </div>
      )}

      <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ color: colors.textMuted, fontSize: '14px', margin: 0 }}>TWMG AI Transformation Project • Data from 27 interviews & 55 survey responses • January 2026</p>
      </footer>
    </div>
  );
}
