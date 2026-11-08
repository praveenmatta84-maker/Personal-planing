import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Calendar,
  BookOpen,
  FileText,
} from 'lucide-react';
import { UserGoal, UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface MindEntranceProps {
  goal: UserGoal;
  user: UserProfile;
  undoCount: number;
  onUndo: () => void;
  onEnterApp: (mindText?: string) => void;
  onOpenAiWithMind: (mindText: string) => void;
  onOpenAuth: () => void;
  onOpenCalendar: () => void;
  onOpenNotebook: () => void;
  onOpenDocuments: () => void;
}

export const MindEntrance: React.FC<MindEntranceProps> = ({
  goal,
  user,
  undoCount,
  onUndo,
  onEnterApp,
  onOpenAiWithMind,
  onOpenAuth,
  onOpenCalendar,
  onOpenNotebook,
  onOpenDocuments,
}) => {
  const [mindText, setMindText] = useState('');

  const quickPrompts = [
    'Deep focus & study routine',
    'Feynman Technique for learning',
    '3 key tasks without distraction',
  ];

  const handleStartPlanning = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onEnterApp(mindText.trim() || undefined);
  };

  const handleAskAi = () => {
    onOpenAiWithMind(mindText.trim() || 'Create a balanced daily routine timetable for my goal');
  };

  return (
    <div className="relative min-h-screen bg-orange-flow flex flex-col justify-between text-white selection:bg-white selection:text-orange-600 overflow-hidden font-sans">
      {/* Decorative soft atmospheric glow overlays */}
      <div className="absolute inset-0 bg-orange-mesh pointer-events-none opacity-80" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onUndo}
            disabled={undoCount === 0}
            title={undoCount > 0 ? `Undo (${undoCount})` : 'Nothing to undo'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
              undoCount > 0
                ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-md active:scale-95 cursor-pointer'
                : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Undo</span>
            {undoCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-orange-600 flex items-center justify-center text-[10px] tabular-nums font-bold">
                {undoCount}
              </span>
            )}
          </button>

          <span className="text-xs font-serif font-semibold tracking-wide text-white/90 hidden sm:inline">
            Plan For Your Goal
          </span>
        </div>

        {/* Right: Download App, Nav & Profile */}
        <div className="flex items-center gap-2">
          {/* Prominent Download App Button */}
          <PWAInstallButton variant="hero" />

          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Calendar</span>
          </button>

          <button
            onClick={onOpenNotebook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Notebook</span>
          </button>

          <button
            onClick={onOpenDocuments}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Documents</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all cursor-pointer"
            title={user.isLoggedIn ? user.email : 'Sign In'}
          >
            <div className="w-5 h-5 rounded-full bg-white text-orange-600 flex items-center justify-center text-[11px] font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-xs font-medium max-w-[80px] truncate hidden sm:inline">
              {user.isLoggedIn ? user.name : 'Sign In'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Flow Content: "What's on your mind?" */}
      <main className="relative z-10 max-w-2xl mx-auto w-full px-6 py-6 sm:py-12 my-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight leading-tight drop-shadow-sm">
          What's on your mind?
        </h1>

        {/* Clean Card */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white text-stone-900 shadow-2xl border border-white/40 space-y-3.5 text-left transition-all">
          <form onSubmit={handleStartPlanning} className="space-y-3">
            <textarea
              value={mindText}
              onChange={(e) => setMindText(e.target.value)}
              placeholder="Set a goal, explore an idea, or plan today's routine..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-orange-50/50 hover:bg-orange-50/80 focus:bg-white border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-stone-900 text-sm placeholder:text-stone-400 outline-hidden transition-all resize-none font-sans"
            />

            {/* Quick Inspiration Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => setMindText(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-orange-100 hover:text-orange-900 text-stone-600 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => onEnterApp()}
                className="text-xs text-stone-500 hover:text-orange-700 font-medium transition-colors cursor-pointer py-1"
              >
                Go to slots →
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAskAi}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 text-xs font-semibold border border-orange-200 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Ask AI</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <span>Plan Goal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-white/70 max-w-6xl mx-auto w-full flex items-center justify-between">
        <span className="font-light text-white/60">Offline ready</span>
        <button
          onClick={() => onEnterApp()}
          className="text-white hover:text-white/90 underline font-medium cursor-pointer"
        >
          Open Timetable ({goal.title || 'My Routine'})
        </button>
      </footer>
    </div>
  );
};
