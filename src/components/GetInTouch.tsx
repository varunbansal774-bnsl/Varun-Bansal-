import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  Heart, 
  Send,
  HelpCircle
} from 'lucide-react';

export default function GetInTouch() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('supplement_proposal');
  const [message, setMessage] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) {
      setErrorText('Please specify your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorText('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setErrorText('Please enter a message at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database secure transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('supplement_proposal');
    setMessage('');
    setIsSubmitted(false);
    setErrorText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Intro block */}
      <div className="border-b border-slate-200 pb-4 text-center md:text-left">
        <span className="inline-flex items-center gap-1 bg-emerald-55 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-150">
          <MessageSquare className="h-3 w-3 text-emerald-600" />
          Interactive Telemetry Interface
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-900 mt-2">Get In Touch & Feedback Portal</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
          Have a specific whey protein powder you want analyzed? Spotted a nutritional concentration mismatch? Or looking to collaborate on sports nutrition calculators? Send us a ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Standard contact info cards (span 5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 bottom-0 h-24 w-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-semibold text-sm flex items-center gap-1.5 font-display text-white">
              <Mail className="h-4 w-4 text-emerald-450 animate-pulse" />
              Direct Correspondence
            </h3>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              For security, licensing inquiries, or clinical supplement audits, email our team directly.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-850">
              <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase">SECURE SMTP INBOX</span>
              <span className="font-mono text-emerald-350 text-xs font-bold block mt-0.5 select-all">
                telemetry@scoopyield.com
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
              Frequently Submitted Queries
            </h4>
            <div className="text-[11px] space-y-3 text-slate-550 leading-normal">
              <div>
                <strong className="text-slate-850 block">How often is the default brand database updated?</strong>
                <p className="mt-0.5 text-slate-400">Our preset formulas cover standard globally circulating whey lots. We review laboratory audits quarterly.</p>
              </div>
              <div>
                <strong className="text-slate-850 block">Can I submit organic vegan/plant proteins?</strong>
                <p className="mt-0.5 text-slate-400">Yes! Use the Custom Tub form, declare its amino source (Pea, Brown Rice, Soy), and calculate metrics instantly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Feedback Form (span 7) */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200/95 overflow-hidden shadow-sm p-6">
            
            {isSubmitted ? (
              /* Success Landing Screen */
              <div className="py-12 px-4 text-center space-y-5 animate-scaleIn">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-700 border-2 border-emerald-305 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Telemetry Received Successfully!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-800">{name}</span>. Your sports nutrition feedback has been securely transmitted. A nutrition scientist will review your ticket shortly.
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[10px] text-slate-450 inline-block">
                  Ticket-ID: #SY-{(Math.random() * 1000000).toFixed(0)} | Status: Logged
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 hover:text-white px-5 py-2 text-xs font-bold transition-all text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              /* Core Form Interactive UI */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <h3 className="font-bold font-display text-slate-900 text-sm border-b border-slate-50 pb-2">
                  Submit Feedback Ticket
                </h3>

                {errorText && (
                  <div className="p-3 bg-red-50 rounded-lg text-red-800 text-xs flex items-center gap-2 border border-red-100">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-650" />
                    <span>{errorText}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-655 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. Coach Alexander"
                    className="w-full rounded-lg border border-slate-205 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-hidden font-medium bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-655 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. coach@alexander.com"
                    className="w-full rounded-lg border border-slate-205 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-hidden font-medium bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-655 mb-1">Subject Classification</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-205 focus:border-emerald-500 bg-slate-50 focus:bg-white px-3 py-2 text-xs font-medium text-slate-800 pointer-events-auto"
                  >
                    <option value="supplement_proposal">Propose New Whey Supplement (preset request)</option>
                    <option value="reporting_error">Reporting Nutritional Data Mismatch</option>
                    <option value="collab_inquiry">E-Com Affiliate / API Licensing Collaborations</option>
                    <option value="nutrition_query">Submit Custom Nutrition Science Query</option>
                    <option value="general_feedback">General Feedback & Appreciation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-655 mb-1">Detailed Inquiry / Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Describe your inquiry or paste your supplement nutrition panel stats here..."
                    className="w-full rounded-lg border border-slate-205 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-hidden font-medium bg-slate-50 focus:bg-white resize-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Min 10 characters required. We store zero tracking trackers or third party trackers.</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer border border-emerald-700/40"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>Securing Telemetry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Transmit Ticket</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
