import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveCalculator from '../components/InteractiveCalculator';
import GraphVisualizer from '../components/GraphVisualizer';
import InteractiveRuler from '../components/InteractiveRuler';
import InteractiveGeometry from '../components/InteractiveGeometry';
import { Calculator, LineChart, ArrowLeft, Home, Ruler, Hexagon } from 'lucide-react';

interface ToolsPageProps {
  tool: 'calculator' | 'graphs' | 'ruler' | 'geometry';
}

export default function ToolsPage({ tool }: ToolsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/tools/calculator"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                tool === 'calculator'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span>Calculadora</span>
            </Link>
            <Link
              to="/tools/graphs"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                tool === 'graphs'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LineChart className="w-5 h-5" />
              <span>Gráficos</span>
            </Link>
            <Link
              to="/tools/ruler"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                tool === 'ruler'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Ruler className="w-5 h-5" />
              <span>Régua</span>
            </Link>
            <Link
              to="/tools/geometry"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                tool === 'geometry'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Hexagon className="w-5 h-5" />
              <span>Geometria</span>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {tool === 'calculator' ? (
              <>
                <Calculator className="w-8 h-8 text-blue-500" />
                Calculadora Interativa
              </>
            ) : tool === 'graphs' ? (
              <>
                <LineChart className="w-8 h-8 text-blue-500" />
                Visualizador de Gráficos
              </>
            ) : tool === 'ruler' ? (
              <>
                <Ruler className="w-8 h-8 text-blue-500" />
                Régua Interativa
              </>
            ) : (
              <>
                <Hexagon className="w-8 h-8 text-blue-500" />
                Formas Geométricas Interativas
              </>
            )}
          </h1>
          <p className="mt-2 text-gray-600">
            {tool === 'calculator'
              ? 'Use a calculadora para praticar operações matemáticas básicas e avançadas.'
              : tool === 'graphs'
              ? 'Explore diferentes funções matemáticas e suas representações gráficas.'
              : tool === 'ruler'
              ? 'Meça e compare distâncias com precisão.'
              : 'Calcule áreas, perímetros e outras medidas de formas geométricas.'}
          </p>
        </div>

        {/* Tool Content */}
        {tool === 'calculator' ? <InteractiveCalculator /> 
         : tool === 'graphs' ? <GraphVisualizer />
         : tool === 'ruler' ? <InteractiveRuler />
         : <InteractiveGeometry />}
      </div>
    </div>
  );
}