'use client';

import { useEffect, useState } from 'react';
import type { RoomType } from '../components/RoomCanvas';

const STORAGE_KEY = 'sri-majisa-designs';

interface SavedDesign {
  code: string;
  customerName: string;
  phone: string;
  room: RoomType;
  laminate: string;
  hardware: string;
  notes: string;
  createdAt: string;
}

const loadDesigns = (): SavedDesign[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedDesign[];
  } catch {
    return [];
  }
};

export default function AdminPage() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    // Load leads saved on this device (offline-ready).
    setDesigns(loadDesigns().reverse());
  }, []);

  const handleClear = () => {
    // Clear local leads for a fresh showroom day.
    window.localStorage.removeItem(STORAGE_KEY);
    setDesigns([]);
  };

  return (
    <main className="container">
      <div className="admin-header">
        <div>
          <span className="badge">Admin Dashboard</span>
          <h1 style={{ margin: '8px 0 0' }}>Customer Leads</h1>
          <p className="small">Leads saved locally on this device.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/">
            <button type="button" className="secondary">
              Back to Visualizer
            </button>
          </a>
          <button type="button" className="ghost" onClick={handleClear}>
            Clear Local Leads
          </button>
        </div>
      </div>

      <div className="card">
        {designs.length === 0 ? (
          <p className="small">No leads saved yet. Ask the sales team to save a design first.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Room</th>
                <th>Laminate</th>
                <th>Hardware</th>
                <th>Notes</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design) => (
                <tr key={design.code}>
                  <td>{design.code}</td>
                  <td>{design.customerName || 'Walk-in'}</td>
                  <td>{design.phone || '-'}</td>
                  <td>{design.room}</td>
                  <td>{design.laminate}</td>
                  <td>{design.hardware}</td>
                  <td>{design.notes || '-'}</td>
                  <td>{new Date(design.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
