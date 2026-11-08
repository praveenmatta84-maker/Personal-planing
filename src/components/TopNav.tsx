import React from 'react';
import { RotateCcw, Calendar, BookOpen, FileText, User as UserIcon, Flame } from 'lucide-react';
import { UserGoal, UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface TopNavProps {
  goal: UserGoal;
  user: UserProfile;
  undoCount: number;
  onUndo: () => void;
  onOpenCalendar: () => void;
  onOpenNotebook: () => void;
  onOpenDocuments: () => void;
  onOpenAuth: () => void;
  onOpenMindEntrance: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  goal,
  user,
  undoCount,
  onUndo,
  onOpenCalendar,
  onOpenNotebook,
  onOpenDocuments,
  onOpenAuth,
  onOpenMindEntrance,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-orange-100 px-3 sm:px-6 py-2.5 transition-colors shadow-2xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left Zone: Undo Button + Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onUndo}
            disabled={undoCount === 0}
            title={undoCount > 0 ? `Undo (${undoCount})` : 'Nothing to undo'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              undoCount > 0
                ? 'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 active:scale-95 cursor-pointer shadow-2xs'
                : 'text-stone-300 bg-stone-50 border border-stone-100 cursor-not-allowed opacity-40'
            }`}
            aria-label="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Undo</span>
            {undoCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] tabular-nums font-semibold">
                {undoCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenMindEntrance}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="What's on your mind?"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform shrink-0" />
            <span className="font-serif text-base sm:text-lg tracking-tight font-semibold text-stone-900 group-hover:text-orange-600 transition-colors">
              Plan For Your Goal
            </span>
          </button>
        </div>

        {/* Center Zone: Quick Goal / Streak Button */}
        <div className="hidden md:flex flex-1 max-w-xs items-center justify-center">
          <button
            onClick={onOpenCalendar}
            title="Calendar & streak"
            className="group flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-50/70 hover:bg-orange-100 border border-orange-200 transition-all text-left shadow-2xs max-w-full cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
            <span className="text-xs font-semibold text-orange-900 tabular-nums">
              {goal.streak}d Streak
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-medium text-stone-700 truncate max-w-[130px]">
              {goal.title || 'My Routine'}
            </span>
          </button>
        </div>

        {/* Right Zone: Download App, Nav Shortcuts & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Prominent Download / Install App button */}
          <PWAInstallButton variant="header" />

          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-stone-700 hover:text-orange-600 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden lg:inline">Calendar</span>
          </button>

          <button
            onClick={onOpenNotebook}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-stone-700 hover:text-orange-600 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden lg:inline">Notebook</span>
          </button>

          <button
            onClick={onOpenDocuments}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-stone-700 hover:text-orange-600 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden lg:inline">Documents</span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-white hover:bg-orange-50 border border-stone-200 hover:border-orange-300 transition-all cursor-pointer shadow-2xs"
            title={user.isLoggedIn ? user.email : 'Sign in'}
          >
            <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-xs font-medium text-stone-800 max-w-[80px] truncate hidden sm:inline">
              {user.isLoggedIn ? user.name : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
