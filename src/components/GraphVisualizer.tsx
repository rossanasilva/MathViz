import React, { useEffect, useRef, useState } from 'react';
import { LineChart, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export default function GraphVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(20); // pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState('x * x');

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = offset.x % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = offset.y % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, height/2 + offset.y);
    ctx.lineTo(width, height/2 + offset.y);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(width/2 + offset.x, 0);
    ctx.lineTo(width/2 + offset.x, height);
    ctx.stroke();

    // Draw axis labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    
    // X-axis numbers
    for (let x = -10; x <= 10; x++) {
      const pixelX = width/2 + x * scale + offset.x;
      ctx.fillText(x.toString(), pixelX - 6, height/2 + offset.y + 20);
    }

    // Y-axis numbers
    for (let y = -10; y <= 10; y++) {
      const pixelY = height/2 - y * scale + offset.y;
      ctx.fillText(y.toString(), width/2 + offset.x - 20, pixelY + 4);
    }
  };

  const evaluateExpression = (x: number): number => {
    try {
      // Process the expression to handle various formats
      let processedExpression = expression
        // Handle cases like "3x" -> "3*x"
        .replace(/(\d+)x/g, '$1*x')
        // Handle cases like "x3" -> "x*3"
        .replace(/x(\d+)/g, 'x*$1')
        // Handle cases like "x^3" -> "Math.pow(x,3)"
        .replace(/x\^(\d+)/g, 'Math.pow(x,$1)');

      const fn = new Function('x', `return ${processedExpression}`);
      return fn(x);
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return 0;
    }
  };

  const drawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const points: Point[] = [];
    const step = 1/scale;

    for (let pixelX = 0; pixelX < width; pixelX++) {
      const x = (pixelX - width/2 - offset.x) / scale;
      const y = evaluateExpression(x);
      const pixelY = height/2 - y * scale + offset.y;
      
      if (pixelX === 0) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
      
      points.push({ x: pixelX, y: pixelY });
    }

    ctx.stroke();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw components
    drawGrid(ctx, canvas.width, canvas.height);
    drawAxes(ctx, canvas.width, canvas.height);
    drawFunction(ctx, canvas.width, canvas.height);
  };

  useEffect(() => {
    redrawCanvas();
  }, [scale, offset, expression]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 100));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 10));
  };

  const handleReset = () => {
    setScale(20);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LineChart className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Visualizador de Gráficos</h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Diminuir zoom"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Resetar visualização"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Função f(x) =
        </label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Digite uma expressão (ex: x * x)"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-move"
        />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Dicas:</p>
        <ul className="list-disc list-inside">
          <li>Arraste para mover o gráfico</li>
          <li>Use os botões de zoom ou a roda do mouse</li>
          <li>Exemplos de funções:</li>
          <ul className="ml-6 list-disc">
            <li>x * x (parábola)</li>
            <li>Math.sin(x) (função seno)</li>
            <li>x^3 (função cúbica)</li>
            <li>3x (função linear)</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}