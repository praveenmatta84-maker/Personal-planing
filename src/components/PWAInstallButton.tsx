import React, { useState } from 'react';
import { Download, Check, X, Smartphone, Monitor } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running inside standalone PWA mode, show minimal badge or hide
  if (isInstalled) {
    if (variant === 'header') {
      return (
        <span
          title="App installed and running locally offline"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-900 text-[11px] font-medium border border-orange-200"
        >
          <Check className="w-3 h-3 text-orange-600 stroke-[2.5]" />
          <span>Installed</span>
        </span>
      );
    }
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  const buttonContent = (
    <>
      <Download className="w-3.5 h-3.5 text-white shrink-0 group-hover:-translate-y-0.5 transition-transform" />
      <span>Download App</span>
    </>
  );

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleClick}
          title="Download & install app for offline use"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
        >
          {buttonContent}
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleClick}
          title="Download app to home screen / desktop"
          className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/40 text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
        >
          {buttonContent}
        </button>
      )}

      {variant === 'floating' && (
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-xl border border-orange-400 hover:bg-orange-500 transition-all cursor-pointer"
        >
          {buttonContent}
        </button>
      )}

      {/* Install Guidance Dialog */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-orange-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 font-serif">
                  Download & Install
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Install <strong>Plan For Your Goal</strong> directly on your computer or phone for 1-click access and complete offline functionality:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-start gap-2.5">
                <Monitor className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Desktop (Chrome / Edge / Brave):</span>
                  <span className="text-stone-600 text-[11px]">
                    Click the <strong>Install App</strong> icon on the right side of the address bar, or menu <strong className="font-mono">⋮ &gt; Install</strong>.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Mobile:</span>
                  <span className="text-stone-600 text-[11px]">
                    {isIOS ? (
                      <>Tap <strong>Share</strong> in Safari, then tap <strong>Add to Home Screen</strong>.</>
                    ) : (
                      <>Tap the browser menu <strong className="font-mono">⋮</strong> and select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
