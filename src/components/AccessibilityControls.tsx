import React from 'react';
import { Sun, Moon, Type, ZoomIn } from 'lucide-react';

interface AccessibilityControlsProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
  onFontSizeChange: (size: 'normal' | 'large' | 'larger') => void;
  onContrastChange: (contrast: 'normal' | 'high') => void;
}

export default function AccessibilityControls({
  onThemeChange,
  onFontSizeChange,
  onContrastChange
}: AccessibilityControlsProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onThemeChange('dark')}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Alternar tema escuro"
        >
          <Moon className="w-5 h-5" />
          <span>Tema Escuro</span>
        </button>

        <button
          onClick={() => onThemeChange('light')}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Alternar tema claro"
        >
          <Sun className="w-5 h-5" />
          <span>Tema Claro</span>
        </button>

        <button
          onClick={() => onFontSizeChange('large')}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Aumentar tamanho da fonte"
        >
          <Type className="w-5 h-5" />
          <span>Fonte Grande</span>
        </button>

        <button
          onClick={() => onContrastChange('high')}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Alto contraste"
        >
          <ZoomIn className="w-5 h-5" />
          <span>Alto Contraste</span>
        </button>
      </div>
    </div>
  );
}