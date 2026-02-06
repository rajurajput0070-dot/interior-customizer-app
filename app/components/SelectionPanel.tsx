'use client';

import type { RoomType } from './RoomCanvas';

interface SelectionPanelProps {
  room: RoomType;
  laminate: string;
  hardware: string;
  rooms: RoomType[];
  laminates: string[];
  hardwareOptions: string[];
  language: 'en' | 'hi';
  onRoomChange: (room: RoomType) => void;
  onLaminateChange: (laminate: string) => void;
  onHardwareChange: (hardware: string) => void;
}

export function SelectionPanel({
  room,
  laminate,
  hardware,
  rooms,
  laminates,
  hardwareOptions,
  language,
  onRoomChange,
  onLaminateChange,
  onHardwareChange
}: SelectionPanelProps) {
  // Labels are localized so staff can switch between English and Hindi.
  const labels = {
    en: {
      room: 'Room type',
      laminate: 'Laminate finish',
      hardware: 'Hardware set'
    },
    hi: {
      room: 'कक्ष प्रकार',
      laminate: 'लैमिनेट फ़िनिश',
      hardware: 'हार्डवेयर सेट'
    }
  };

  return (
    <div className="controls">
      <label>
        {labels[language].room}
        <select value={room} onChange={(event) => onRoomChange(event.target.value as RoomType)}>
          {rooms.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        {labels[language].laminate}
        <select value={laminate} onChange={(event) => onLaminateChange(event.target.value)}>
          {laminates.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        {labels[language].hardware}
        <select value={hardware} onChange={(event) => onHardwareChange(event.target.value)}>
          {hardwareOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
