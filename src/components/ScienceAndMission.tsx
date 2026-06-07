import React from 'react';
import { 
  BookOpen, 
  Atom, 
  HelpCircle, 
  AlertCircle, 
  Check, 
  Award,
  Heart,
  FileText
} from 'lucide-react';

export default function ScienceAndMission() {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Dynamic Header Badge */}
      <div className="border-b border-slate-205 pb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-850 border border-emerald-200 mb-2">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
          The Bioactive Sports Nutrition Dossier
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900">The Science & Mission Behind ScoopYield</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Uncompromised sports science meets clinical transparency. Contrast raw dairy filtration systems, discover how Nitrogen Retention influences Biological Value, and map the impact of artificial excipients on the human gut biome.
        </p>
      </div>

      {/* Prominent Golden Quote Box with exact user text quotation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-md">
        {/* Abstract background vector overlay */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[20%] h-32 w-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative space-y-4 max-w-4xl">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800">
            Inspired Core Mission Compass
          </span>
          
          <blockquote className="text-sm md:text-xl lg:text-2xl font-serif italic font-medium leading-relaxed text-emerald-50/95">
            "Like nutrition. Ah, like how much protein per scoop or like percentage of protein per scoop. the fat content, uh, the bio availability of protein, the editates and everything."
          </blockquote>
          
          <div className="flex items-center gap-3 pt-2">
            <div className="h-10 w-px bg-emerald-500/40" />
            <div>
              <p className="text-xs font-extrabold text-white">The Direct Inspiration Quote</p>
              <p className="text-[10px] text-emerald-300 font-mono">Founding Equation for Science-Backed Supplement Evaluation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Bioavailability and biological value */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Atom className="h-4.5 w-4.5 text-emerald-600 animate-spin-slow" />
            Understanding Bioavailability & Biological Value (BV)
          </h3>
          
          <p className="text-xs text-slate-500 leading-relaxed">
            Not all protein consumed is synthesized by muscles. <strong>Biological Value (BV)</strong> measures Nitrogen Retention efficiency. It represents the percentage of absorbed nitrogen that is retained by the body for cellular growth and muscle synthesis.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
              <span className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-emerald-100">
                159
              </span>
              <div>
                <span className="font-bold text-xs text-slate-800 block">Whey Hydrolyzed (BV 159) — Rapid Peak Peptides</span>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Enzymatically pre-digested (hydrolyzed) isolate. Breaks long polypeptide links into short di/tri-peptides. Enters circulation near-instantly, inducing high insulinotropic spikes. Perfect for immediate rehabilitation.
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
              <span className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-800 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-indigo-100">
                140
              </span>
              <div>
                <span className="font-bold text-xs text-slate-800 block">Whey Isolate (BV 140) — Premium Sieve Purity</span>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Subjected to Cross-Flow Microfiltration (CFM) or ion-exchange chromatography. Strips out almost all lactose, water, carbs, and lipids, yielding &ge;90% dry weight protein concentration. Excellent for fat-shredding cuts.
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
              <span className="h-7 w-7 rounded-lg bg-amber-50 text-amber-850 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-amber-100/30">
                104
              </span>
              <div>
                <span className="font-bold text-xs text-slate-800 block">Whey Concentrate (BV 104) — Standard Whole Bio-complex</span>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Ultrafiltered gently to preserve immunoglobulin fractions, bovine serum albumin, and lactoferrins that bolster systemic immune resilience. Contains slightly higher natural fats and lactose sugars.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decoding Additives (Excipients / "Editates") */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertCircle className="h-4.5 w-4.5 text-slate-500" />
            Decoding "Editates" (Additives & Chemical Fillers)
          </h3>
          
          <p className="text-xs text-slate-500 leading-relaxed">
            To create a shelf-stable, instantized, sweet-tasting vanilla or chocolate beverage, manufacturers introduce structural chemicals. For sensitive digestions, these can contribute to bloating, gas, or gut microflora disruption.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Emulsifiers (Soy vs Sunflower Lecithin)
              </span>
              <p className="text-slate-500 mt-1 text-[11px] leading-tight">
                Used to make the hydrophobic protein fats mix effortlessly with water. Soy lecithin is ultra-common but carries soy allergens. Sunflower lecithin is cold-pressed, allergen-free, and higher in vital phosphatidylcholine.
              </p>
            </div>

            <div className="py-2.5">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Gum Stabilizers (Xanthan Gum, Carrageenan, Cellulose Gum)
              </span>
              <p className="text-slate-500 mt-1 text-[11px] leading-tight">
                Polysaccharides harvested from bacterial fermentation or seaweed. Provide milkshakes their dense, velvety viscosity. Frequent consumption of carrageenan may irritate sensitive bowel linings, causing bloating.
              </p>
            </div>

            <div className="py-2.5">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Artificial Sweeteners (Sucralose, Acesulfame-K, Stevia)
              </span>
              <p className="text-slate-500 mt-1 text-[11px] leading-tight">
                <strong>Sucralose</strong> is chlorinated sucrose (Splenda)—600x sweeter than sugar. It is highly heat-stable but subject to ongoing metabolic studies. <strong>Stevia & Monk Fruit</strong> are herbal substitutes with clean gut toleration, but carry an herbal metallic aftertaste.
              </p>
            </div>
            
            <div className="py-2.5 bg-emerald-50/20 p-2.5 rounded-lg border border-dashed border-emerald-250/60 mt-2">
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                🏆 The Ideal Digestive Blueprint:
              </span>
              <p className="text-emerald-950 mt-1 text-[11.5px] leading-tight">
                To maximize digestive performance, seek out supplements that are <strong>Stevia sweetened</strong>, utilize <strong>Sunflower Lecithin</strong>, exclude organic gum thickeners, and include digestive enzymes (lactase and protease blends) to break down milk sugars easily.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
