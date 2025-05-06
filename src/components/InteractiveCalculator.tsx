import React, { useState } from 'react';
import { Calculator, Delete, Divide, Minus, Plus, X } from 'lucide-react';

export default function InteractiveCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(result.toString());
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;
    
    const current = parseFloat(display);
    const result = calculate(previousValue, current, operation);
    
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Calculadora Interativa</h2>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-right text-3xl font-mono">{display}</div>
        {operation && (
          <div className="text-right text-sm text-gray-500 mt-1">
            {previousValue} {operation}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* First Row */}
        <button
          onClick={handleClear}
          className="col-span-2 p-4 text-lg font-medium bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
        >
          <Delete className="w-5 h-5" />
          <span>Limpar</span>
        </button>
        <button
          onClick={() => handleOperation('/')}
          className="p-4 text-lg font-medium bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Divide className="w-5 h-5 mx-auto" />
        </button>
        <button
          onClick={() => handleOperation('*')}
          className="p-4 text-lg font-medium bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <X className="w-5 h-5 mx-auto" />
        </button>

        {/* Number Pad */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 text-lg font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {num}
          </button>
        ))}

        {/* Operations */}
        <button
          onClick={() => handleOperation('-')}
          className="p-4 text-lg font-medium bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Minus className="w-5 h-5 mx-auto" />
        </button>
        <button
          onClick={() => handleOperation('+')}
          className="p-4 text-lg font-medium bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Plus className="w-5 h-5 mx-auto" />
        </button>

        {/* Last Row */}
        <button
          onClick={() => handleNumber('0')}
          className="p-4 text-lg font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="p-4 text-lg font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="col-span-2 p-4 text-lg font-medium bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
        >
          =
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Dicas:</p>
        <ul className="list-disc list-inside">
          <li>Use o teclado numérico para entrada rápida</li>
          <li>Pressione Enter para calcular</li>
          <li>Pressione Esc para limpar</li>
        </ul>
      </div>
    </div>
  );
}