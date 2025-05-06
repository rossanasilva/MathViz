import React, { useState } from 'react';
import { Circle, Square, Triangle, Hexagon } from 'lucide-react';

interface ShapeCalculation {
  area: number;
  perimeter: number;
  otherMeasures?: Record<string, number>;
}

type Shape = 'circle' | 'square' | 'rectangle' | 'triangle' | 'hexagon';

export default function InteractiveGeometry() {
  const [selectedShape, setSelectedShape] = useState<Shape>('circle');
  const [dimensions, setDimensions] = useState({
    radius: 5,
    side: 5,
    width: 6,
    height: 4,
    base: 6,
    triangleHeight: 4,
    hexagonSide: 5
  });
  const [calculation, setCalculation] = useState<ShapeCalculation | null>(null);

  const calculateShape = () => {
    let calc: ShapeCalculation = {
      area: 0,
      perimeter: 0,
      otherMeasures: {}
    };

    switch (selectedShape) {
      case 'circle':
        calc.area = Math.PI * dimensions.radius * dimensions.radius;
        calc.perimeter = 2 * Math.PI * dimensions.radius;
        calc.otherMeasures = {
          diameter: dimensions.radius * 2
        };
        break;

      case 'square':
        calc.area = dimensions.side * dimensions.side;
        calc.perimeter = 4 * dimensions.side;
        calc.otherMeasures = {
          diagonal: Math.sqrt(2) * dimensions.side
        };
        break;

      case 'rectangle':
        calc.area = dimensions.width * dimensions.height;
        calc.perimeter = 2 * (dimensions.width + dimensions.height);
        calc.otherMeasures = {
          diagonal: Math.sqrt(dimensions.width * dimensions.width + dimensions.height * dimensions.height)
        };
        break;

      case 'triangle':
        calc.area = (dimensions.base * dimensions.triangleHeight) / 2;
        // Assuming equilateral triangle for perimeter
        calc.perimeter = 3 * dimensions.base;
        break;

      case 'hexagon':
        calc.area = ((3 * Math.sqrt(3)) / 2) * (dimensions.hexagonSide * dimensions.hexagonSide);
        calc.perimeter = 6 * dimensions.hexagonSide;
        calc.otherMeasures = {
          inradius: dimensions.hexagonSide * Math.sqrt(3) / 2,
          circumradius: dimensions.hexagonSide
        };
        break;
    }

    // Round all numbers to 2 decimal places
    calc.area = Number(calc.area.toFixed(2));
    calc.perimeter = Number(calc.perimeter.toFixed(2));
    if (calc.otherMeasures) {
      Object.keys(calc.otherMeasures).forEach(key => {
        calc.otherMeasures![key] = Number(calc.otherMeasures![key].toFixed(2));
      });
    }

    setCalculation(calc);
  };

  const renderInputs = () => {
    switch (selectedShape) {
      case 'circle':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Raio (cm)
            </label>
            <input
              type="number"
              value={dimensions.radius}
              onChange={(e) => setDimensions({ ...dimensions, radius: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              step="0.1"
            />
          </div>
        );

      case 'square':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lado (cm)
            </label>
            <input
              type="number"
              value={dimensions.side}
              onChange={(e) => setDimensions({ ...dimensions, side: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              step="0.1"
            />
          </div>
        );

      case 'rectangle':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Largura (cm)
              </label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'triangle':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base (cm)
              </label>
              <input
                type="number"
                value={dimensions.base}
                onChange={(e) => setDimensions({ ...dimensions, base: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                value={dimensions.triangleHeight}
                onChange={(e) => setDimensions({ ...dimensions, triangleHeight: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'hexagon':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lado (cm)
            </label>
            <input
              type="number"
              value={dimensions.hexagonSide}
              onChange={(e) => setDimensions({ ...dimensions, hexagonSide: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              step="0.1"
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Hexagon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Formas Geométricas Interativas</h2>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <button
          onClick={() => setSelectedShape('circle')}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
            selectedShape === 'circle' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}
        >
          <Circle className="w-6 h-6" />
          <span className="text-sm">Círculo</span>
        </button>
        <button
          onClick={() => setSelectedShape('square')}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
            selectedShape === 'square' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}
        >
          <Square className="w-6 h-6" />
          <span className="text-sm">Quadrado</span>
        </button>
        <button
          onClick={() => setSelectedShape('rectangle')}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
            selectedShape === 'rectangle' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}
        >
          <Square className="w-6 h-6" />
          <span className="text-sm">Retângulo</span>
        </button>
        <button
          onClick={() => setSelectedShape('triangle')}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
            selectedShape === 'triangle' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}
        >
          <Triangle className="w-6 h-6" />
          <span className="text-sm">Triângulo</span>
        </button>
        <button
          onClick={() => setSelectedShape('hexagon')}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
            selectedShape === 'hexagon' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'
          }`}
        >
          <Hexagon className="w-6 h-6" />
          <span className="text-sm">Hexágono</span>
        </button>
      </div>

      <div className="mb-6">
        {renderInputs()}
      </div>

      <button
        onClick={calculateShape}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-6"
      >
        Calcular
      </button>

      {calculation && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Área</h3>
            <p className="text-2xl font-bold text-blue-600">{calculation.area} cm²</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Perímetro</h3>
            <p className="text-2xl font-bold text-blue-600">{calculation.perimeter} cm</p>
          </div>

          {calculation.otherMeasures && Object.keys(calculation.otherMeasures).length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Outras Medidas</h3>
              {Object.entries(calculation.otherMeasures).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{key}</span>
                  <span className="font-bold text-blue-600">{value} cm</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>Dicas:</p>
        <ul className="list-disc list-inside">
          <li>Selecione uma forma geométrica</li>
          <li>Insira as medidas necessárias</li>
          <li>Clique em calcular para ver área, perímetro e outras medidas</li>
          <li>Todas as medidas são em centímetros (cm)</li>
        </ul>
      </div>
    </div>
  );
}