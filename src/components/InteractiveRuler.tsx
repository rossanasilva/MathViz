import React, { useRef, useState, useEffect } from 'react';
import { Ruler } from 'lucide-react';

interface InteractiveRulerProps {
  maxLength?: number; // in centimeters
  initialScale?: number; // pixels per centimeter
}

export default function InteractiveRuler({ maxLength = 30, initialScale = 40 }: InteractiveRulerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(initialScale);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [startMeasure, setStartMeasure] = useState<{ x: number; y: number } | null>(null);

  const drawRuler = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw main ruler line
    ctx.beginPath();
    ctx.moveTo(50, height/2);
    ctx.lineTo(width - 50, height/2);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw measurements
    for (let i = 0; i <= maxLength; i++) {
      const x = 50 + i * scale;
      
      // Draw centimeter marks
      ctx.beginPath();
      ctx.moveTo(x, height/2 - 15);
      ctx.lineTo(x, height/2 + 15);
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw numbers
      ctx.fillStyle = '#1e40af';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), x, height/2 + 30);

      // Draw millimeter marks
      for (let j = 1; j < 10; j++) {
        const xMm = x + (j * scale/10);
        const height = j === 5 ? 10 : 5; // Longer mark for 5mm
        
        ctx.beginPath();
        ctx.moveTo(xMm, height/2 - height);
        ctx.lineTo(xMm, height/2 + height);
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw measurement line if measuring
    if (startMeasure && measurement !== null) {
      ctx.beginPath();
      ctx.moveTo(startMeasure.x, startMeasure.y);
      ctx.lineTo(startMeasure.x + measurement * scale, startMeasure.y);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw measurement text
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${measurement.toFixed(1)} cm`,
        startMeasure.x + (measurement * scale)/2,
        startMeasure.y - 10
      );
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setStartPoint({ x, y });
    setStartMeasure({ x, y });
    setMeasurement(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !startMeasure) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    const distance = (x - startMeasure.x) / scale;
    setMeasurement(Math.max(0, Math.min(maxLength, distance)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawRuler(ctx, canvas.width, canvas.height);
  }, [scale, measurement, startMeasure]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Ruler className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Régua Interativa</h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          Clique e arraste para medir distâncias. Cada marca representa 1 centímetro.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden bg-gray-50">
        <canvas
          ref={canvasRef}
          width={1000}
          height={200}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-crosshair"
        />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Dicas:</p>
        <ul className="list-disc list-inside">
          <li>Clique e arraste para medir uma distância</li>
          <li>As marcas menores representam milímetros</li>
          <li>A linha vermelha mostra a medição atual</li>
        </ul>
      </div>
    </div>
  );
}