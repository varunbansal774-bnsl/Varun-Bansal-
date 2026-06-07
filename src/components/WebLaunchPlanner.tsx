import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Server, 
  CheckSquare, 
  Square, 
  BrainCircuit, 
  Sparkles, 
  Info, 
  ArrowUpRight, 
  ChevronRight,
  Award,
  Sliders,
  Sparkle
} from 'lucide-react';

export default function WebLaunchPlanner() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [scratchNotes, setScratchNotes] = useState<string>('');

  useEffect(() => {
    const savedChecked = localStorage.getItem('ay_planner_checked');
    if (savedChecked) {
      setCheckedItems(JSON.parse(savedChecked));
    } else {
      // default initial features checked
      setCheckedItems(['purpose', 'compare-matrix', 'custom-builder', 'ai-consult', 'mission-info']);
    }

    const savedNotes = localStorage.getItem('ay_planner_notes');
    if (savedNotes) {
      setScratchNotes(savedNotes);
    } else {
      setScratchNotes('My Whey Nutrition Brainstorm Notes:\n- Target Launch: Q3\n- Moniker ideas: ScoopScale, PureScoop Labs\n- Brand identity accents: Bioactive Emerald & Tech Slate\n- Affiliate prospects: ON Gold standard, MyProtein.');
    }
  }, []);

  const toggleCheck = (id: string) => {
    const next = checkedItems.includes(id) 
      ? checkedItems.filter(x => x !== id) 
      : [...checkedItems, id];
    setCheckedItems(next);
    localStorage.setItem('ay_planner_checked', JSON.stringify(next));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setScratchNotes(text);
    localStorage.setItem('ay_planner_notes', text);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Visual Subheader Intro banner */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-850 border border-emerald-200 uppercase font-mono mb-2">
            Interactive Startup Incubator
          </span>
          <h2 className="text-xl font-bold font-display text-slate-900">Website Blueprint & Launch Planner</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Planning a new supplement blog, calculator, or e-commerce comparator? Use this scientific workbook to map out your target demographics, select domains, check hosting options, and cross off interactive milestones.
          </p>
        </div>
        <div className="shrink-0 bg-white p-3 rounded-xl border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Launch Readiness</span>
            <span className="text-sm font-extrabold text-slate-800 font-mono">
              {Math.round((checkedItems.length / 11) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main content columns (span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Brainstorming Purpose & Audience */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-emerald-600" />
              1. Brainstorming: Purpose & Target Audience
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[10px] mb-2 text-emerald-800">
                  🎯 Primary Website Purpose
                </span>
                <p className="text-slate-550 leading-relaxed">
                  Provide radical transparency in the sports nutrition sector. Help consumers filter through dense marketing jargon to find cost-optimized, digestion-comfortable, chemical-grade clean whey proteins. The focus is to map real dry weights to actual pure protein, isolating additives that trigger gut issues.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[10px] mb-2 text-indigo-800">
                  👥 Target Audience Demographics
                </span>
                <ul className="space-y-1 text-slate-550 list-disc pl-4 leading-relaxed">
                  <li><strong>Active Bodybuilders & Lifters</strong> matching high daily macs</li>
                  <li><strong>Coaches & Nutritionists</strong> recommending pure supplements</li>
                  <li><strong>Lactose-Intolerant / Sensitive Individuals</strong> checking excipients</li>
                  <li><strong>Aesthetic Competitors</strong> seeking extremely low fat/carb parameters</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50/50 rounded-xl border border-indigo-150 p-4 text-xs text-indigo-950 flex gap-3">
              <Info className="h-4 w-4 text-indigo-750 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Key Brand Anchor Statement:</strong>
                <p className="mt-1 leading-relaxed text-indigo-900/90">
                  Build and pitch your marketing around <strong>digestive bio-matching</strong>. Most brands talk about taste; your website wins by talking about raw yield, bioavailability, and gut-comfort (eliminating synthetic emulsifiers and heavy thickeners).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Domain Name Advisor */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="h-4.5 w-4.5 text-emerald-600" />
              2. Supplement Startup: Domain Selection Guide
            </h3>
            
            <div className="text-xs text-slate-500 leading-relaxed space-y-2">
              <p>
                A high-quality domain is critical to rank on search engines (SEO) and gain trust. Prioritize standard, high-credibility extensions, such as <strong>.com</strong>, <strong>.co</strong>, or wellness-aligned names like <strong>.fit</strong> or <strong>.health</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-400 font-extrabold block text-[9px] uppercase font-mono">Rule 1</span>
                  <span className="font-bold text-slate-800 block mt-0.5">Concise & Actionable</span>
                  <p className="text-[10px] text-slate-500 mt-1">Keep it under 3 words or 15 letters so it remains easy to type.</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-400 font-extrabold block text-[9px] uppercase font-mono">Rule 2</span>
                  <span className="font-bold text-slate-800 block mt-0.5">Brandable & No Hyphens</span>
                  <p className="text-[10px] text-slate-500 mt-1">Hyphens make word-of-mouth extremely difficult. Avoid numerals.</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-400 font-extrabold block text-[9px] uppercase font-mono">Rule 3</span>
                  <span className="font-bold text-slate-800 block mt-0.5">Target Keyterms</span>
                  <p className="text-[10px] text-slate-500 mt-1">Include words like scoop, whey, yield, or check to guide intent.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-800 mb-2">💡 Curated Domain Recommendations & Core Niches:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-150/50 flex justify-between items-center group hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="font-mono font-bold text-emerald-850">ScoopYield.com</span>
                    <span className="block text-[10px] text-slate-400">High-end comparison & dry mass calculators</span>
                  </div>
                  <Sparkle className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <div className="p-3 bg-indigo-50/30 rounded-xl border border-indigo-150/50 flex justify-between items-center group hover:border-indigo-300 transition-colors">
                  <div>
                    <span className="font-mono font-bold text-indigo-850">ProteinsPerScoop.com</span>
                    <span className="block text-[10px] text-slate-400">Direct comparison tables & filler ratings</span>
                  </div>
                  <Sparkle className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-slate-805">CleanWheyCheck.com</span>
                    <span className="block text-[10px] text-slate-400">Additive transparency & organic listings</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-slate-805">BioactiveWhey.com</span>
                    <span className="block text-[10px] text-slate-400">Focuses purely on high-bioavailability</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Web Hosting Matrix */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Server className="h-4.5 w-4.5 text-emerald-600" />
              3. Reliable Web Hosting Recommendations
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Choosing the right host depends on whether you run a **static frontend (React/HTML)** or a **full-stack setup** that hosts an Express/Python server alongside your database.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-100">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase text-[9px] tracking-wider">
                  <tr>
                    <th className="p-3">Hosting Provider</th>
                    <th className="p-3">Best Suited For</th>
                    <th className="p-3">Estimated Cost</th>
                    <th className="p-3">Primary Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-slate-650">
                  <tr>
                    <td className="p-3 font-semibold text-slate-850">Vercel / Netlify</td>
                    <td className="p-3">Client-Side Static SPAs (React)</td>
                    <td className="p-3 text-emerald-700 font-bold">Free Tier / $20 mo</td>
                    <td className="p-3">Instant setup, global CDN edge, automatic deployments on git commits.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-850">Render / Railway</td>
                    <td className="p-3">Simple Full-Stack Apps (Express API)</td>
                    <td className="p-3 text-slate-705">$5 - $7 per web service</td>
                    <td className="p-3">Native backend service builder, robust environment variable configs.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-850">Google Cloud Run</td>
                    <td className="p-3">High-Scale Docker containers</td>
                    <td className="p-3 text-emerald-700 font-bold">Free tier / Pay-per-use</td>
                    <td className="p-3">Scale to zero capabilities (saves cost when quiet) and enterprise performance.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-850">DigitalOcean / Linode</td>
                    <td className="p-3">Self-Managed Virtual Servers (VPS)</td>
                    <td className="p-3">$4 - $12 mo flat</td>
                    <td className="p-3">Root shell access, total software stack independence. Requires terminal skills.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-900 flex gap-3">
              <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Important Server Note:</strong>
                <p className="mt-1 leading-relaxed text-amber-805">
                  Because this specific Protein Analyzer integrates with server-side AI endpoints to keep the **Gemini API Key completely secure**, you will need a <strong>Full-Stack environment</strong> (like Google Cloud Run or Render webhook service) to deploy both the front-end interface and Express server securely.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Right sticky column: Interactive features checklist & scrap pad (span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Feature Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-4 flex items-center justify-between">
              <span>Launch Checklist</span>
              <span className="text-[10px] text-emerald-750 font-bold font-sans bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded">
                Interactive
              </span>
            </h3>

            <div className="space-y-3">
              {/* Feature items grouped */}
              {[
                { id: 'purpose', text: 'Clarify Primary Brand Purpose', category: 'Strategy' },
                { id: 'compare-matrix', text: 'Interactive Whey Comparison Matrix', category: 'Lab' },
                { id: 'custom-builder', text: 'Active Formulations custom editor', category: 'Lab' },
                { id: 'ai-consult', text: 'Natural Language AI Expert route', category: 'AI' },
                { id: 'mission-info', text: 'Mission Statement Quote banner', category: 'Branding' },
                { id: 'contact-page', text: 'Working contact feedback portal', category: 'Engagement' },
                
                { id: 'domain-buy', text: 'Purchase Domain (.com preferred)', category: 'Deploy' },
                { id: 'host-link', text: 'Secure Full-Stack Web Host provision', category: 'Deploy' },
                { id: 'sec-leak', text: 'Verify Secrets/API keys are server-side', category: 'Security' },
                { id: 'aff-links', text: 'Affiliate protein buying integrations', category: 'Revenue' },
                { id: 'seo-tags', text: 'Optimize meta tags for "Protein per Scoop"', category: 'Growth' },
              ].map(item => {
                const isSelected = checkedItems.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-emerald-250 bg-emerald-50/10 text-slate-750' 
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-emerald-600">
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs font-semibold block ${isSelected ? 'line-through text-slate-450' : 'text-slate-800'}`}>
                        {item.text}
                      </span>
                      <span className="text-[9px] font-mono uppercase bg-slate-100 text-slate-400 px-1 py-0.2 rounded font-bold mt-1 inline-block">
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Persistent Scrap Notebook */}
          <div className="bg-slate-90 px-4 py-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
              <Award className="h-4.5 w-4.5 text-emerald-400" />
              Startup Ideen-Scrapbook
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              Instantly draft supplement formulas, marketing keywords, social strategies, or hosting subfolders here. Saved directly to browser memory.
            </p>
            <textarea
              value={scratchNotes}
              onChange={handleNotesChange}
              rows={6}
              placeholder="Type your notes or design specifications here..."
              className="w-full bg-slate-850/70 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs leading-relaxed text-slate-250 placeholder-slate-600 outline-hidden focus:ring-1 focus:ring-emerald-400 font-mono"
            />
            <div className="text-[9px] text-slate-500 font-mono text-right font-medium">
              💾 Auto-saved to LocalStorage
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
