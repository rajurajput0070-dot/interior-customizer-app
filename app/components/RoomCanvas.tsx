'use client';

import { useEffect, useRef } from 'react';

export type RoomType = 'Bedroom' | 'Kitchen' | 'Main Door';

interface RoomCanvasProps {
  room: RoomType;
  laminate: string;
  hardware: string;
  language: 'en' | 'hi';
}

const roomSketch: Record<RoomType, { title: string; notes: string[] }> = {
  Bedroom: {
    title: 'Bedroom Scene',
    notes: ['Wardrobe', 'Bed platform', 'Side panel']
  },
  Kitchen: {
    title: 'Kitchen Scene',
    notes: ['Base cabinets', 'Loft storage', 'Countertop']
  },
  'Main Door': {
    title: 'Main Door Scene',
    notes: ['Door panel', 'Handle set', 'Frame trim']
  }
};

const roomSketchHi: Record<RoomType, { title: string; notes: string[] }> = {
  Bedroom: {
    title: 'बेडरूम दृश्य',
    notes: ['वार्डरोब', 'बेड प्लेटफॉर्म', 'साइड पैनल']
  },
  Kitchen: {
    title: 'किचन दृश्य',
    notes: ['बेस कैबिनेट', 'लॉफ्ट स्टोरेज', 'काउंटरटॉप']
  },
  'Main Door': {
    title: 'मुख्य दरवाज़ा दृश्य',
    notes: ['डोर पैनल', 'हैंडल सेट', 'फ्रेम ट्रिम']
  }
};

export function RoomCanvas({ room, laminate, hardware, language }: RoomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const width = canvas.width;
    const height = canvas.height;

    context.clearRect(0, 0, width, height);
    context.fillStyle = '#f7f3ec';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#8a4b00';
    context.lineWidth = 3;
    context.strokeRect(16, 16, width - 32, height - 32);

    context.fillStyle = '#5a2f00';
    context.font = 'bold 18px Inter, sans-serif';
    const roomData = language === 'hi' ? roomSketchHi[room] : roomSketch[room];
    context.fillText(roomData.title, 28, 44);

    context.font = '14px Inter, sans-serif';
    context.fillStyle = '#2b2b2b';
    roomData.notes.forEach((note, index) => {
      context.fillText(`• ${note}`, 32, 74 + index * 22);
    });

    context.fillStyle = '#8a4b00';
    context.fillRect(32, height - 90, width - 64, 40);

    context.fillStyle = '#ffffff';
    context.font = 'bold 14px Inter, sans-serif';
    context.fillText(laminate, 42, height - 64);

    context.fillStyle = '#5a2f00';
    context.fillRect(32, height - 42, width - 64, 26);

    context.fillStyle = '#ffffff';
    context.font = '12px Inter, sans-serif';
    context.fillText(hardware, 42, height - 24);
  }, [room, laminate, hardware, language]);

  return (
    <div className="canvas-wrapper">
      <canvas ref={canvasRef} width={520} height={360} aria-label="Room preview" />
    </div>
  );
}
