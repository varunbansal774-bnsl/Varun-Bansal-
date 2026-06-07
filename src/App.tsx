import React, { useState, useEffect } from 'react';
import { 
  Atom, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  Flame, 
  Sliders, 
  BrainCircuit, 
  Info, 
  Sparkles, 
  Calculator, 
  Award, 
  TrendingUp, 
  ChevronRight,
  RefreshCw,
  Cookie,
  Droplet,
  BookOpen,
  Mail,
  Globe,
  Server,
  MessageSquare,
  CheckSquare,
  Square,
  ExternalLink
} from 'lucide-react';

import WebLaunchPlanner from './components/WebLaunchPlanner';
import ScienceAndMission from './components/ScienceAndMission';
import GetInTouch from './components/GetInTouch';
import EfficiencyScatterPlot from './components/EfficiencyScatterPlot';

interface WheyProtein {
  id: string;
  brand: string;
  name: string;
  isCustom?: boolean;
  scoopSize: number;          // total weight in g
  proteinPerScoop: number;    // protein in g
  fatPerScoop: number;        // fat in g
  carbsPerScoop: number;      // carbs in g
  proteinType: 'Isolate' | 'Concentrate' | 'Hydrolyzed' | 'Blended';
  bioavailabilityScore: number; // BV index
  bioavailabilityDesc: string; 
  additives: string[];         // "editates"
  ingredientsText: string;
  digestiveEnzymes: boolean;
  sweetenerType: string;
  colorsAndFlavors: string;
}

// Pre-loaded realistic whey protein data
const PRESET_PROTEINS: WheyProtein[] = [
  {
    id: 'on-gold',
    brand: 'Optimum Nutrition',
    name: 'Gold Standard 100% Whey (Double Rich Chocolate)',
    scoopSize: 30.4,
    proteinPerScoop: 24,
    fatPerScoop: 1.5,
    carbsPerScoop: 3,
    proteinType: 'Blended',
    bioavailabilityScore: 104,
    bioavailabilityDesc: 'High efficiency blend of Isolate, Concentrate, and Peptides.',
    additives: ['Lecithin (Soy)', 'Acesulfame Potassium', 'Sucralose', 'Aminogen Enzymes', 'Lactase'],
    ingredientsText: 'Protein Blend (Whey Protein Isolate, Whey Protein Concentrate, Whey Peptides), Cocoa, Lecithin, Natural and Artificial Flavors, Acesulfame Potassium, Aminogen, Lactase.',
    digestiveEnzymes: true,
    sweetenerType: 'Sucralose & Acesulfame Potassium (Artificial)',
    colorsAndFlavors: 'Natural & Artificial Chocolate'
  },
  {
    id: 'dymatize-iso',
    brand: 'Dymatize',
    name: 'ISO100 (Gourmet Chocolate)',
    scoopSize: 30,
    proteinPerScoop: 25,
    fatPerScoop: 0.5,
    carbsPerScoop: 1,
    proteinType: 'Hydrolyzed',
    bioavailabilityScore: 159,
    bioavailabilityDesc: 'Ultra-fast absorption. Enzymatically broken down peptides for rapid synthesis.',
    additives: ['Soy Lecithin emulsifier', 'Sucralose', 'Steviol Glycosides (Stevia)', 'Salt', 'Xanthan Gum'],
    ingredientsText: 'Hydrolyzed Whey Protein Isolate, Whey Protein Isolate, Cocoa Powder, Salt, Soy Lecithin, Natural and Artificial Flavors, Xanthan Gum, Potassium Chloride, Sucralose, Steviol Glycosides.',
    digestiveEnzymes: false,
    sweetenerType: 'Sucralose & Stevia (Mixed)',
    colorsAndFlavors: 'Natural & Artificial Gourmet'
  },
  {
    id: 'myprotein-isolate',
    brand: 'MyProtein',
    name: 'Impact Whey Isolate (Unflavored)',
    scoopSize: 25,
    proteinPerScoop: 22,
    fatPerScoop: 0.1,
    carbsPerScoop: 0.6,
    proteinType: 'Isolate',
    bioavailabilityScore: 140,
    bioavailabilityDesc: 'Extremely high purity. Standard premium filtration preserves microfractions.',
    additives: ['Sunflower Lecithin emulsifier'],
    ingredientsText: 'Whey Protein Isolate (Milk) [99%], Emulsifier (Sunflower Lecithin).',
    digestiveEnzymes: false,
    sweetenerType: 'None (Unsweetened)',
    colorsAndFlavors: 'None (Pure Raw Natural)'
  },
  {
    id: 'isopure-zero',
    brand: 'Isopure',
    name: 'Zero Carb (Creamy Vanilla)',
    scoopSize: 31,
    proteinPerScoop: 25,
    fatPerScoop: 0,
    carbsPerScoop: 0,
    proteinType: 'Isolate',
    bioavailabilityScore: 140,
    bioavailabilityDesc: 'Pure microfiltered isolate, stripped of all sugars, carbs, lactose and fats.',
    additives: ['Soy Lecithin emulsifier', 'Sucralose', 'Silicon Dioxide', 'Vitamin/Mineral Blend'],
    ingredientsText: 'Whey Protein Isolate, Vitamin and Mineral Blend, Soy Lecithin, Natural & Artificial Flavor, Sucralose.',
    digestiveEnzymes: false,
    sweetenerType: 'Sucralose (Artificial)',
    colorsAndFlavors: 'Natural & Artificial Vanilla'
  },
  {
    id: 'muscletech-nitro',
    brand: 'MuscleTech',
    name: 'NitroTech (Milk Chocolate)',
    scoopSize: 46,
    proteinPerScoop: 30,
    fatPerScoop: 3.0,
    carbsPerScoop: 4,
    proteinType: 'Blended',
    bioavailabilityScore: 104,
    bioavailabilityDesc: 'High efficiency multi-source with added creatine matrix enhancement.',
    additives: ['Creatine Monohydrate (3g)', 'Soy/Sunflower Lecithin', 'Sucralose', 'Acesulfame Potassium', 'Gum Blend (Cellulose, Xanthan, Carrageenan)', 'Papain', 'Amylase'],
    ingredientsText: 'Single Source Peptide & Isolate Blend (Whey Peptides, Whey Protein Isolate, Whey Protein Isolate 97%), Whey Protein Concentrate, Creatine Monohydrate, Cocoa, Natural and Artificial Flavors, Gum Blend, Soy Lecithin, Salt, Enzyplex (Papain, Amylase), Sucralose, Acesulfame Potassium.',
    digestiveEnzymes: true,
    sweetenerType: 'Sucralose & Acesulfame Potassium (Artificial)',
    colorsAndFlavors: 'Natural & Artificial Chocolate with thickeners'
  }
];

export default function App() {
  const [proteins, setProteins] = useState<WheyProtein[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['on-gold', 'dymatize-iso', 'myprotein-isolate']);
  const [dailyProteinGoal, setDailyProteinGoal] = useState<number>(120);
  
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'lab' | 'planner' | 'about' | 'contact'>('lab');

  // Website Planner Checklist & Notes State
  const [plannerChecked, setPlannerChecked] = useState<string[]>(['matrix', 'builder', 'ai', 'mission', 'contact']);
  const [plannerNotes, setPlannerNotes] = useState<string>('');

  // Contact Form Inputs & Status State
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSubject, setContactSubject] = useState<string>('general_nutrition');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSubmitting, setContactSubmitting] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  
  // Custom formula builder state
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);
  const [customBrand, setCustomBrand] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [customScoopSize, setCustomScoopSize] = useState<number>(30);
  const [customProtein, setCustomProtein] = useState<number>(24);
  const [customFat, setCustomFat] = useState<number>(1.5);
  const [customCarbs, setCustomCarbs] = useState<number>(2);
  const [customType, setCustomType] = useState<'Isolate' | 'Concentrate' | 'Hydrolyzed' | 'Blended'>('Concentrate');
  const [customSweetener, setCustomSweetener] = useState<string>('Sucralose');
  const [customAdditivesText, setCustomAdditivesText] = useState<string>('Soy Lecithin, Xanthan Gum, Artificial Flavor');
  const [customIngredients, setCustomIngredients] = useState<string>('Whey Protein Concentrate, Soy Lecithin, Natural Flavor, Sucralose.');
  const [customEnzymes, setCustomEnzymes] = useState<boolean>(false);

  // AI analysis panel states
  const [activeAiId, setActiveAiId] = useState<string>('on-gold');
  const [aiResult, setAiResult] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [questionResponse, setQuestionResponse] = useState<string>('');
  const [questionLoading, setQuestionLoading] = useState<boolean>(false);

  // Measurement units state ('metric' for grams, 'imperial' for scoops/ounces)
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ay_custom_proteins');
    const customList: WheyProtein[] = saved ? JSON.parse(saved) : [];
    setProteins([...PRESET_PROTEINS, ...customList]);
    
    const savedPlannerChecked = localStorage.getItem('ay_planner_checked');
    if (savedPlannerChecked) {
      setPlannerChecked(JSON.parse(savedPlannerChecked));
    }
    const savedPlannerNotes = localStorage.getItem('ay_planner_notes');
    if (savedPlannerNotes) {
      setPlannerNotes(savedPlannerNotes);
    }
    const savedUnitSystem = localStorage.getItem('ay_unit_system');
    if (savedUnitSystem === 'metric' || savedUnitSystem === 'imperial') {
      setUnitSystem(savedUnitSystem);
    }
  }, []);

  // Sync custom proteins to local storage
  const saveCustomList = (updatedCustom: WheyProtein[]) => {
    localStorage.setItem('ay_custom_proteins', JSON.stringify(updatedCustom));
    const presets = PRESET_PROTEINS;
    setProteins([...presets, ...updatedCustom]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBrand || !customName) {
      alert('Please fill out the Brand Name and Product Name fields.');
      return;
    }

    // Determine Bioavailability score & description from type
    let bvScore = 104;
    let bvDesc = 'Good standard absorption, contains natural immunoglobulins.';
    if (customType === 'Isolate') {
      bvScore = 140;
      bvDesc = 'Very high purity, stripped of lactose and majority of fats.';
    } else if (customType === 'Hydrolyzed') {
      bvScore = 159;
      bvDesc = 'Rapid enzymatic breakdown. Faster peak amino acid blood levels.';
    } else if (customType === 'Blended') {
      bvScore = 115;
      bvDesc = 'Balanced multi-source protein release curve.';
    }

    const newProtein: WheyProtein = {
      id: `custom-${Date.now()}`,
      brand: customBrand,
      name: customName,
      isCustom: true,
      scoopSize: Number(customScoopSize),
      proteinPerScoop: Number(customProtein),
      fatPerScoop: Number(customFat),
      carbsPerScoop: Number(customCarbs),
      proteinType: customType,
      bioavailabilityScore: bvScore,
      bioavailabilityDesc: bvDesc,
      additives: customAdditivesText.split(',').map(s => s.trim()).filter(Boolean),
      ingredientsText: customIngredients,
      digestiveEnzymes: customEnzymes,
      sweetenerType: customSweetener,
      colorsAndFlavors: 'Custom Flavor Formulation'
    };

    const saved = localStorage.getItem('ay_custom_proteins');
    const currentCustoms: WheyProtein[] = saved ? JSON.parse(saved) : [];
    const updated = [newProtein, ...currentCustoms];
    saveCustomList(updated);

    // Auto-select this newly created tub for side-by-side comparison
    setSelectedIds(prev => [...prev, newProtein.id]);
    setIsAddingCustom(false);

    // Reset fields
    setCustomBrand('');
    setCustomName('');
    setCustomScoopSize(30);
    setCustomProtein(24);
    setCustomFat(1.5);
    setCustomCarbs(2);
    setCustomType('Concentrate');
    setCustomSweetener('Sucralose');
    setCustomAdditivesText('Soy/Sunflower Lecithin, Xanthan Gum, Artificial Flavor');
    setCustomIngredients('Whey Protein Concentrate, Soy Lecithin, Cocoa, Natural and Artificial Flavor, Sucralose.');
    setCustomEnzymes(false);
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = localStorage.getItem('ay_custom_proteins');
    const currentCustoms: WheyProtein[] = saved ? JSON.parse(saved) : [];
    const updated = currentCustoms.filter(p => p.id !== id);
    saveCustomList(updated);
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    if (activeAiId === id) {
      setActiveAiId('on-gold');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        // Keep at least 1 selected
        if (prev.length <= 1) return prev;
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Run AI report on specific formula
  const analyzeWithAi = async (proteinId: string) => {
    const target = proteins.find(p => p.id === proteinId);
    if (!target) return;

    setActiveAiId(proteinId);
    setAiLoading(true);
    setAiResult('');

    try {
      const response = await fetch('/api/analyze-nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: `${target.brand} - ${target.name}`,
          scoopSize: target.scoopSize,
          proteinPerScoop: target.proteinPerScoop,
          fatContent: target.fatPerScoop,
          proteinType: target.proteinType,
          additives: target.additives.join(', '),
        })
      });
      const data = await response.json();
      if (data.content) {
        setAiResult(data.content);
      } else {
        setAiResult('Unable to retrieve analysis. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setAiResult('Error communicating with the nutritional intelligence server.');
    } finally {
      setAiLoading(false);
    }
  };

  // Submit custom scientific question
  const askCustomQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setQuestionLoading(true);
    setQuestionResponse('');

    try {
      const response = await fetch('/api/analyze-nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customQuestion: customQuestion.trim()
        })
      });
      const data = await response.json();
      if (data.content) {
        setQuestionResponse(data.content);
      } else {
        setQuestionResponse('Something went wrong. Please check your workspace settings.');
      }
    } catch (err) {
      console.error(err);
      setQuestionResponse('An issue occurred while processing the response.');
    } finally {
      setQuestionLoading(false);
    }
  };

  // Auto trigger first report
  useEffect(() => {
    if (proteins.length > 0 && !aiResult && !aiLoading) {
      analyzeWithAi('on-gold');
    }
  }, [proteins]);

  const selectedProteins = proteins.filter(p => selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Dynamic Header banner */}
      <header className="border-b border-slate-200 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/50 mb-3">
                <Atom className="h-3 md:w-3 text-emerald-600 animate-spin-slow" />
                Science-Backed Supplement Comparator
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Whey Protein Nutrition Analyzer
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl font-sans">
                Analyze and compare protein concentrations, bioavailability levels, fat ratios, and chemical excipients (additives) across popular and custom powders. Build clean health stacks based on real numbers.
              </p>
            </div>
            
            {/* Quick status counter */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 self-start md:self-auto">
              <div className="text-center px-4">
                <span className="block text-2xl font-bold text-emerald-700 font-mono">
                  {proteins.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">Formulas</span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center px-4">
                <span className="block text-2xl font-bold text-slate-800 font-mono">
                  {selectedIds.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">Comparing</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sticky Tabs */}
      <div className="bg-white border-b border-slate-205 sticky top-0 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'lab'
                  ? 'border-emerald-600 text-emerald-950'
                  : 'border-transparent text-slate-500 hover:text-slate-805'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>🔬 Nutritional Comparison Lab</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'planner'
                  ? 'border-emerald-600 text-emerald-950'
                  : 'border-transparent text-slate-500 hover:text-slate-805'
              }`}
            >
              <BrainCircuit className="h-4 w-4" />
              <span>💡 Web Launch Planner & Guide</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'border-emerald-600 text-emerald-950'
                  : 'border-transparent text-slate-500 hover:text-slate-805'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>📖 Science & Core Mission</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'contact'
                  ? 'border-emerald-600 text-emerald-950'
                  : 'border-transparent text-slate-500 hover:text-slate-805'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>✉️ Get in Touch & Feedback</span>
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {activeTab === 'lab' && (
          <>
            {/* Row 1: Tub selector & custom tub register */}
            <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                Select Formulations to Compare
              </h2>
              <p className="text-xs text-slate-400 mt-1">Select multiple products below or declare your own custom tub metrics to start comparing.</p>
            </div>
            
            <button 
              id="add-custom-btn"
              onClick={() => setIsAddingCustom(!isAddingCustom)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold transition-all duration-200 self-start md:self-auto shadow-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {isAddingCustom ? 'Cancel Builder' : 'Add Custom Tub'}
            </button>
          </div>

          {/* Quick interactive drawer for custom protein declaration */}
          {isAddingCustom && (
            <form onSubmit={handleAddCustom} className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 w-fit">
                <Calculator className="h-4 w-4" />
                <span className="text-xs font-semibold font-mono">Custom Whey Formulations Lab</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Brand Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Optimum Health" 
                    value={customBrand} 
                    onChange={e => setCustomBrand(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Product Flavor / Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Whey Isolate Extreme (Salted Caramel)" 
                    value={customName} 
                    onChange={e => setCustomName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Primary Protein Processing Class</label>
                  <select 
                    value={customType} 
                    onChange={e => setCustomType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden"
                  >
                    <option value="Concentrate">Concentrate (Whey Concentrate — Standard Filtration)</option>
                    <option value="Isolate">Isolate (Pure Whey Isolate — Microfiltered)</option>
                    <option value="Hydrolyzed">Hydrolyzed (Pre-digested Whey Peptides)</option>
                    <option value="Blended">Blended (Mix of Concentrate, Isolate, & Peptides)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Scoop Size (g) </label>
                  <input 
                    type="number" 
                    min={1} 
                    max={150}
                    value={customScoopSize} 
                    onChange={e => setCustomScoopSize(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 outline-hidden font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Total dry weight of 1 serving</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Pure Protein Yield (g)</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={customScoopSize}
                    value={customProtein} 
                    onChange={e => setCustomProtein(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 outline-hidden font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Grams of protein per scoop</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Fat Content (g)</label>
                  <input 
                    type="number" 
                    min={0} 
                    max={30} 
                    step={0.1}
                    value={customFat} 
                    onChange={e => setCustomFat(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 outline-hidden font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Total fats per scoop</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Carbs Content (g)</label>
                  <input 
                    type="number" 
                    min={0} 
                    max={50} 
                    step={0.1}
                    value={customCarbs} 
                    onChange={e => setCustomCarbs(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 outline-hidden font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Total carbohydrates per scoop</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Additives / "Editates" (Comma Separated list)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Soy Lecithin, Sucralose, Acesulfame Potassium, Xanthan Gum" 
                    value={customAdditivesText} 
                    onChange={e => setCustomAdditivesText(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">List emulsifiers, non-nutritive sweeteners, thickeners, colors, or stabilizers.</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Primary Sweeteners used</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Stevia, Monk Fruit, Sucralose, Ace-K, Unsweetened" 
                    value={customSweetener} 
                    onChange={e => setCustomSweetener(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    id="customEnzymes" 
                    checked={customEnzymes} 
                    onChange={e => setCustomEnzymes(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="customEnzymes" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Contains Bioactive Digestive Enzymes (e.g. Lactase, Aminogen, Papain, Protease)
                  </label>
                </div>
                <p className="text-[10px] text-slate-450 pl-6">
                  Digestive enzymes hydrolyze standard complex peptide bonds into smaller links, significantly lowering flatulence, gas, and stomach upset.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddingCustom(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-semibold cursor-pointer"
                >
                  Save to Formulations
                </button>
              </div>
            </form>
          )}

          {/* Formulations Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {proteins.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              const proteinPercent = ((p.proteinPerScoop / p.scoopSize) * 100).toFixed(0);
              
              return (
                <div 
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    {/* Select Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {p.isCustom && (
                        <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Custom</span>
                      )}
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-600 text-white' 
                          : 'border-slate-300 bg-white group-hover:border-slate-400'
                      }`}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block max-w-[80%] truncate">
                      {p.brand}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 mt-1 text-xs sm:text-sm line-clamp-2 pr-6 leading-tight">
                      {p.name}
                    </h3>

                    {/* Simple Quick Stats */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Protein / Svg</span>
                        <span className="text-sm font-bold text-slate-800 font-mono">
                          {p.proteinPerScoop}g <span className="text-slate-400 font-normal text-xs">/ {p.scoopSize}g</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Pro Yield</span>
                        <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {proteinPercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Type & Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className={`px-2 py-0.5 rounded-sm font-semibold capitalize tracking-wide ${
                      p.proteinType === 'Isolate' ? 'bg-indigo-50 text-indigo-700 font-mono border border-indigo-100/50' : 
                      p.proteinType === 'Hydrolyzed' ? 'bg-emerald-50 text-emerald-800 font-mono border border-emerald-100/50' : 
                      p.proteinType === 'Concentrate' ? 'bg-amber-50 text-amber-850 font-mono border border-amber-100/30' :
                      'bg-slate-100 text-slate-700 font-mono'
                    }`}>
                      {p.proteinType}
                    </span>

                    {p.isCustom && (
                      <button 
                        id={`delete-custom-${p.id}`}
                        onClick={(e) => handleDeleteCustom(p.id, e)}
                        className="p-1 rounded-sm text-slate-400 hover:text-red-550 hover:bg-slate-150 transition-colors"
                        title="Delete custom supplement profile"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Head-to-Head Comparison Matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-600" />
                Head-to-Head Nutritional Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-1">Metrics computed using dry scoop mass ratios, bioavailability indexes, and sweetener structures.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main comparison matrix - horizontal scrollable on mobile */}
            <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
              <div className="p-1 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider border-b border-slate-100">
                      <th className="p-4 rounded-tl-xl w-[220px]">Specification</th>
                      {selectedProteins.map(p => (
                        <th key={p.id} className="p-4 text-center min-w-[140px]">
                          <span className="block text-slate-400 text-[9px] font-bold tracking-wider">{p.brand}</span>
                          <span className="text-xs font-bold text-slate-800 block line-clamp-1">{p.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {/* Scoop VS Protein Metric */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <Droplet className="h-4 w-4 text-emerald-600" />
                          <span>Protein / Scoop Size</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Pure protein vs total dry powder mass per scoop</span>
                      </td>
                      {selectedProteins.map(p => (
                        <td key={p.id} className="p-4 text-center">
                          <span className="block text-base font-bold text-slate-900 font-mono">
                            {p.proteinPerScoop}g
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            of {p.scoopSize}g scoop
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Percentage Pure Protein Yield */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          <span>Protein Yield Percentage</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Percentage of the tub weight which is actual protein</span>
                      </td>
                      {selectedProteins.map(p => {
                        const percent = (p.proteinPerScoop / p.scoopSize) * 100;
                        let barColor = 'bg-amber-500';
                        let textColor = 'text-amber-700';
                        if (percent >= 85) {
                          barColor = 'bg-indigo-600';
                          textColor = 'text-indigo-700';
                        } else if (percent >= 75) {
                          barColor = 'bg-emerald-600';
                          textColor = 'text-emerald-700';
                        }
                        return (
                          <td key={p.id} className="p-4 text-center">
                            <span className={`text-base font-extrabold font-mono ${textColor}`}>
                              {percent.toFixed(1)}%
                            </span>
                            {/* Simple visual mini-dry-meter */}
                            <div className="w-24 h-1.5 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden">
                              <div className={`h-full ${barColor}`} style={{ width: `${percent}%` }}></div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Fat Content Ratios */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <Flame className="h-4 w-4 text-orange-550" />
                          <span>Fat Mass per Scoop</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Fat lipids consumed. Lower is better for shredding/lean cutting.</span>
                      </td>
                      {selectedProteins.map(p => {
                        const isHigh = p.fatPerScoop > 2;
                        const isZero = p.fatPerScoop === 0;
                        return (
                          <td key={p.id} className="p-4 text-center">
                            <span className={`text-sm font-bold font-mono ${isZero ? 'text-emerald-600' : isHigh ? 'text-amber-700' : 'text-slate-800'}`}>
                              {p.fatPerScoop}g
                            </span>
                            <span className="block text-[10px] text-slate-400 font-sans mt-0.5">
                              {isZero ? '🚫 Completely Zero Fat' : isHigh ? '⚠️ Higher Lipids' : '✅ Lean Purity'}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Carbohydrate lipids */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <Cookie className="h-4 w-4 text-amber-800" />
                          <span>Carb Mass per Scoop</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Carbs and sugars per serving. High carbs mean faster glycogen replenishment.</span>
                      </td>
                      {selectedProteins.map(p => (
                        <td key={p.id} className="p-4 text-center">
                          <span className="text-sm font-bold font-mono text-slate-800">
                            {p.carbsPerScoop}g
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {p.carbsPerScoop === 0 ? 'Keto Friendly' : `${(p.carbsPerScoop * 4)} kcal from carbs`}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Bioavailability Profile */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <Atom className="h-4 w-4 text-indigo-600 animate-pulse" />
                          <span>Biological Value (BV)</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Standard clinical index for Nitrogen Retention Efficiency.</span>
                      </td>
                      {selectedProteins.map(p => {
                        let rankText = 'Excellent';
                        let rankColor = 'text-indigo-600 bg-indigo-50 border-indigo-100';
                        if (p.bioavailabilityScore >= 150) {
                          rankText = 'Extreme / Pre-digested';
                          rankColor = 'text-emerald-700 bg-emerald-50 border-emerald-100';
                        } else if (p.bioavailabilityScore === 104) {
                          rankText = 'High Standard';
                          rankColor = 'text-amber-800 bg-amber-50 border-amber-100/40';
                        }
                        return (
                          <td key={p.id} className="p-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg font-extrabold font-mono text-slate-900 border-b border-dashed border-slate-200">
                                {p.bioavailabilityScore}
                              </span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${rankColor}`}>
                                {rankText}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-2 max-w-[150px] mx-auto text-left leading-tight hidden md:block">
                              {p.bioavailabilityDesc}
                            </p>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Digestive Enzymes & Gut Comfort */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-teal-600" />
                          <span>Lactase & Digestive Proteases</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Enzymes to resolve bloating, gas, and stomach cramps.</span>
                      </td>
                      {selectedProteins.map(p => (
                        <td key={p.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {p.digestiveEnzymes ? (
                              <span className="inline-flex items-center gap-1 rounded-sm bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200/40">
                                Active Enzymes
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400">
                                Raw Blend Only
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Additives & Excipients ("Editates" / Sweeteners) */}
                    <tr>
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50 font-sans">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 text-slate-500" />
                          <span>Sweeteners & Additives ("Editates")</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-1">Artificial compounds added for flavor, texture, stability and suspension.</span>
                      </td>
                      {selectedProteins.map(p => (
                        <td key={p.id} className="p-4 text-center font-sans space-y-2">
                          <span className="block text-[10px] font-extrabold text-slate-500">
                            🍬 Sweetener:
                          </span>
                          <span className="block text-xs font-medium text-slate-700 max-w-[140px] mx-auto truncate bg-slate-50 py-0.5 rounded border border-slate-100">
                            {p.sweetenerType}
                          </span>
                          
                          <div className="pt-2 border-t border-slate-100/50">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Additive count: {p.additives.length}</span>
                            <div className="flex flex-wrap gap-1 justify-center max-w-[170px] mx-auto">
                              {p.additives.map((addType, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-[9px] bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded font-mono"
                                  title={addType}
                                >
                                  {addType}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix Side Board (Quick facts/Explanations) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] h-32 w-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                  What is Bioavailability?
                </h3>
                <p className="text-xs text-slate-350 mt-3 leading-relaxed">
                  Bioavailability measures the proportion of nutrients that enters systemic circulation to build lean muscle mass.
                </p>
                
                <ul className="mt-4 space-y-3 text-[11px] text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-450 mt-1.5 shrink-0" />
                    <span><strong>Whey Hydrolyzed (BV 159)</strong>: Predigested into micro-peptides for immediate metabolic release. Recommended pre/intra-workout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    <span><strong>Whey Isolate (BV 140)</strong>: Fast absorption. Minimal lipids. Ideal for fat shredding & recovery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Whey Concentrate (BV 104)</strong>: Medium/slow release. Maintains beneficial bioactive milk microfractions (lactoferrins) which support immunity.</span>
                  </li>
                </ul>
              </div>

              {/* Glossary regarding excipients & sweeteners */}
              <div className="bg-white rounded-2xl border border-slate-250 p-5 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-slate-500" />
                  Decoding "Editates" (Additives)
                </h4>
                <div className="divide-y divide-slate-100 text-[11px] text-slate-500 space-y-2.5">
                  <div className="pt-2">
                    <span className="text-slate-850 font-bold block">Soy/Sunflower Lecithin</span>
                    <p className="mt-0.5 leading-tight">A phospholipid fat used to improve instant solubility. Sunflower is preferred by some due to zero soy allergens.</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-850 font-bold block">Sucralose vs Stevia</span>
                    <p className="mt-0.5 leading-tight">Sucralose is artificial (Splenda), sweet and zero-cal. Stevia is natural, but some find its aftertaste slightly bitter.</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-850 font-bold block">Carrageenan / Xanthan Gum</span>
                    <p className="mt-0.5 leading-tight">Thickeners used for milkshake textures. High doses of carrageenan may irritate sensitive digestive tracts.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Dynamic Efficiency D3 Scatter Plot */}
        <EfficiencyScatterPlot selectedProteins={selectedProteins} />

        {/* Dynamic Multiplier & Daily Target Goal Calculator */}
        <section className="bg-white rounded-2xl border border-slate-250/75 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-950 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Interactive Daily Target Goal Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Determine the total scoops, fat accumulation, and additives consumed in order to hit your daily protein requirements.</p>
            </div>

            {/* Controls panel containing the unit toggle and daily protein goal slider */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 self-start lg:self-auto w-full lg:w-auto">
              
              {/* Unit System Toggle Switch */}
              <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  id="toggle-unit-metric"
                  onClick={() => {
                    setUnitSystem('metric');
                    localStorage.setItem('ay_unit_system', 'metric');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === 'metric'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  Metric (g)
                </button>
                <button
                  type="button"
                  id="toggle-unit-imperial"
                  onClick={() => {
                    setUnitSystem('imperial');
                    localStorage.setItem('ay_unit_system', 'imperial');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === 'imperial'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  Imperial (oz / scoops)
                </button>
              </div>

              {/* Slider control */}
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold text-slate-550 whitespace-nowrap">Daily Goal:</span>
                <input 
                  type="range" 
                  min={40} 
                  max={250} 
                  step={5}
                  value={dailyProteinGoal} 
                  onChange={e => setDailyProteinGoal(Number(e.target.value))}
                  className="w-24 sm:w-32 md:w-36 accent-emerald-600 cursor-pointer"
                />
                <span className="text-sm font-bold text-emerald-700 font-mono whitespace-nowrap bg-emerald-55/60 px-2 py-0.5 rounded border border-emerald-100/50">
                  {dailyProteinGoal}g/day
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProteins.length === 0 ? (
              <div className="col-span-full py-8 text-center text-slate-450 text-xs">
                Select at least one protein formulation above to display calculator analytics.
              </div>
            ) : (
              selectedProteins.map(p => {
                const requiredScoops = p.proteinPerScoop ? (dailyProteinGoal / p.proteinPerScoop) : 0;
                const totalFat = (requiredScoops * p.fatPerScoop).toFixed(1);
                const totalCarbs = (requiredScoops * p.carbsPerScoop).toFixed(1);
                const dryPowderVolume = (requiredScoops * p.scoopSize).toFixed(0);
                
                // conversion metrics
                const dryPowderVolumeOz = (Number(dryPowderVolume) * 0.035274).toFixed(2);
                const totalFatOz = (Number(totalFat) * 0.035274).toFixed(2);
                const totalCarbsOz = (Number(totalCarbs) * 0.035274).toFixed(2);
                const pScoopSizeOz = (p.scoopSize * 0.035274).toFixed(2);
                const pProteinOz = (p.proteinPerScoop * 0.035274).toFixed(2);

                return (
                  <div key={p.id} className="bg-slate-50 p-4 border border-slate-200 rounded-xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">{p.brand}</span>
                      <h3 className="font-display font-extrabold text-slate-850 text-sm truncate">{p.name}</h3>

                      {/* Scoop Multiplier Display */}
                      <div className="my-4 flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-emerald-800 font-mono">
                            {requiredScoops.toFixed(1)}
                          </span>
                          <span className="text-sm text-slate-500 font-semibold">Scoops Required</span>
                        </div>
                        {unitSystem === 'imperial' && (
                          <span className="text-[10px] text-emerald-700 font-mono font-medium mt-0.5">
                            &asymp; {dryPowderVolumeOz} ounces dry powder mass
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                        {/* Scoop Metric Line */}
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                          <span className="text-slate-400 font-medium font-sans">Serving / Single Scoop</span>
                          <span className="font-mono text-slate-800 font-bold">
                            {unitSystem === 'metric' ? (
                              `${p.scoopSize}g (${p.proteinPerScoop}g protein)`
                            ) : (
                              `${pScoopSizeOz} oz (${pProteinOz} oz protein)`
                            )}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                          <span className="text-slate-400 font-medium">Daily Dry Powder Mass</span>
                          <span className="font-mono text-slate-800 font-bold">
                            {unitSystem === 'metric' ? (
                              `${dryPowderVolume} grams`
                            ) : (
                              `${dryPowderVolumeOz} oz`
                            )}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                          <span className="text-slate-400 font-medium">Total Saturated/Fat Intake</span>
                          <span className={`font-mono font-bold ${Number(totalFat) > 8 ? 'text-amber-700' : 'text-slate-800'}`}>
                            {unitSystem === 'metric' ? (
                              `${totalFat} grams`
                            ) : (
                              `${totalFatOz} oz (${totalFat}g)`
                            )}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                          <span className="text-slate-400 font-medium font-sans">Total Carbohydrates</span>
                          <span className="font-mono text-slate-800 font-bold">
                            {unitSystem === 'metric' ? (
                              `${totalCarbs} grams`
                            ) : (
                              `${totalCarbsOz} oz (${totalCarbs}g)`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer based on scoop amount */}
                    <div className="mt-3 text-[10px] p-2 bg-white/70 border border-slate-200 rounded text-slate-450 italic flex items-start gap-1">
                      <Info className="h-3 w-3 shrink-0 text-slate-450 mt-0.5" />
                      <span>
                        {requiredScoops > 4 
                          ? `Consuming over 4 scoops daily accumulates higher levels of emulsifiers (${p.additives[0] || 'Soy Lecithin'}), excipients and coloring agents. Minimize complete reliance on powders.`
                          : 'Sufficient and clean serving depth. Keep whole foods in balance.'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Dynamic AI Intelligent Analysis Panel (Gemini API Integration) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Box 1: Preconfigured AI Deep Dive report */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold font-display text-slate-900">AI Nutritional Intelligence Report</h2>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Selection for evaluation */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1">Select Formulation to Analyze</label>
                <div className="flex gap-2">
                  <select 
                    value={activeAiId}
                    onChange={(e) => setActiveAiId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 outline-hidden font-medium"
                  >
                    {proteins.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.proteinType}] {p.brand} - {p.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    id="trigger-ai-btn"
                    onClick={() => analyzeWithAi(activeAiId)}
                    disabled={aiLoading}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    {aiLoading ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    Analyze Form
                  </button>
                </div>
              </div>

              {/* Report output container */}
              <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[220px] text-xs leading-relaxed space-y-3 font-sans">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-2">
                    <RefreshCw className="h-6 w-6 text-emerald-600 animate-spin" />
                    <span className="font-semibold text-xs">Analyzing bioavailability metrics, additives list and formula ratios...</span>
                  </div>
                ) : aiResult ? (
                  <div className="prose prose-slate max-w-none text-slate-705 whitespace-pre-wrap">
                    {aiResult}
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    Select a whey protein formulation above and click **"Analyze Form"** to generate clinical predictions.
                  </div>
                )}
              </div>
            </div>

            {/* Micro warning regarding API Key state */}
            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Uses server-side **Gemini 3.5 Flash** for intelligence.</span>
              <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                {process.env.GEMINI_API_KEY ? 'API: Secure Linked' : 'Demo Active'}
              </span>
            </div>
          </div>

          {/* Box 2: Custom Ask Nutrition Science Anything Panel */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-800/80">
                <h3 className="font-display font-semibold text-base text-white flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                  Ask Nutrition Science Console
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Prompt Gemini regarding amino profiles, dairy filtration methods, additives sensitivity, or digestion comfort.</p>
              </div>

              <form onSubmit={askCustomQuestion} className="mt-4 space-y-3">
                <label className="block text-[11px] font-bold text-slate-350">Enter Nutritional / Digestion Query</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="e.g. Is cold-filtration better than ion-exchange whey? Or does Sucralose cause bloating?"
                    className="w-full bg-slate-800/80 text-white placeholder-slate-500 rounded-lg border border-slate-700 focus:border-emerald-500 px-3 py-2 text-xs outline-hidden focus:ring-1 focus:ring-emerald-400 font-medium"
                  />
                  <button 
                    id="submit-question-btn"
                    type="submit"
                    disabled={questionLoading || !customQuestion.trim()}
                    className="rounded-lg bg-white text-slate-950 font-bold hover:bg-emerald-400 text-xs px-4 py-2 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    {questionLoading ? <RefreshCw className="h-3 w-3 animate-spin text-slate-950" /> : 'Ask Expert'}
                  </button>
                </div>
              </form>

              {/* Console output display */}
              <div className="mt-5 p-4 bg-slate-800/40 border border-slate-800 rounded-xl min-h-[190px] text-xs leading-relaxed max-h-[290px] overflow-y-auto">
                {questionLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-2">
                    <RefreshCw className="h-5 w-5 text-emerald-400 animate-spin" />
                    <span className="font-semibold text-[10px] text-slate-450">Querying clinical supplement models...</span>
                  </div>
                ) : questionResponse ? (
                  <div className="prose prose-invert whitespace-pre-wrap text-[11.5px] leading-relaxed text-slate-300">
                    {questionResponse}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12 font-medium font-mono text-[10px]">
                    &gt;_ console awaiting nutritional science query.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom quick assistance buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
              <button 
                type="button" 
                onClick={() => {
                  setCustomQuestion('Does whey isolate have lactose? I am highly sensitive.');
                }}
                className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors cursor-pointer text-left"
              >
                Lactose sensitivity?
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCustomQuestion('Why is Protein Yield Percentage more critical than absolute grams of protein per tub?');
                }}
                className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors cursor-pointer text-left"
              >
                Protein Yield importance?
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCustomQuestion('What additives in protein powders are known issues for gut biome health?');
                }}
                className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors cursor-pointer text-left"
              >
                Check gut sweeteners
              </button>
            </div>
          </div>

        </section>
          </>
        )}

        {activeTab === 'planner' && <WebLaunchPlanner />}
        {activeTab === 'about' && <ScienceAndMission />}
        {activeTab === 'contact' && <GetInTouch />}

      </main>

      {/* Humble Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} Whey Protein Comparer. Formulated with scientific dry mass analytics.</p>
        </div>
      </footer>

    </div>
  );
}
