import React, { useState, useEffect } from 'react';

/**
 * Enhanced Keyboard Shortcuts Help Component
 */
const KeyboardShortcuts = ({ isVideo = false, isVisible = false }) => {
  const [showShortcuts, setShowShortcuts] = useState(isVisible);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowShortcuts(true);
      setFadeOut(false);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowShortcuts(false), 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        setShowShortcuts(!showShortcuts);
        setFadeOut(false);
      }
      if (e.key === 'Escape' && showShortcuts) {
        setFadeOut(true);
        setTimeout(() => setShowShortcuts(false), 300);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  if (!showShortcuts) return null;

  const shortcuts = [
    { keys: ['Space'], action: isVideo ? 'پخش/توقف' : 'بستن' },
    { keys: ['Esc'], action: 'بستن' },
    { keys: ['←', '→'], action: isVideo ? 'جابجایی در ویدیو' : 'تصویر قبلی/بعدی' },
    ...(isVideo ? [
      { keys: ['↑', '↓'], action: 'جلو/عقب 10 ثانیه' },
      { keys: ['M'], action: 'خاموش/روشن صدا' },
      { keys: ['↑/↓'], action: 'تنظیم صدا' },
    ] : []),
    { keys: ['?'], action: 'نمایش راهنما' },
  ];

  return (
    <div 
      className={`fixed top-6 right-6 z-60 bg-gray-900/95 backdrop-blur-lg text-white p-6 rounded-2xl border border-green-500/30 shadow-2xl transition-all duration-300 ${
        fadeOut ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{ maxWidth: '320px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
          </svg>
          میانبرهای کیبورد
        </h3>
        <button
          onClick={() => {
            setFadeOut(true);
            setTimeout(() => setShowShortcuts(false), 300);
          }}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          aria-label="بستن"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Shortcuts List */}
      <div className="space-y-3">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {shortcut.keys.map((key, keyIndex) => (
                <React.Fragment key={keyIndex}>
                  <kbd className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-sm font-mono min-w-[2rem] text-center">
                    {key}
                  </kbd>
                  {keyIndex < shortcut.keys.length - 1 && (
                    <span className="text-white/60 text-xs">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <span className="text-white/80 text-sm">{shortcut.action}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-white/60 text-center">
          برای بستن <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Esc</kbd> یا <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">?</kbd> را فشار دهید
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
