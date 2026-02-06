'use client';

import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { RoomCanvas, type RoomType } from './components/RoomCanvas';
import { SelectionPanel } from './components/SelectionPanel';

const rooms: RoomType[] = ['Bedroom', 'Kitchen', 'Main Door'];
const laminates = ['Warm Walnut', 'Champagne Oak', 'Matte Ivory', 'Smoked Grey'];
const hardwareOptions = ['Soft-close Hinges', 'Slimline Handles', 'Premium Lock Set'];

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

const labels = {
  en: {
    hero: 'Build a complete interior look before you purchase.',
    customer: 'Customer details',
    name: 'Customer name',
    phone: 'WhatsApp number',
    notes: 'Requirements / notes',
    save: 'Save design & generate code',
    share: 'Share on WhatsApp',
    savedCode: 'Design saved with code',
    shareHint: 'Share this design preview with the customer instantly.',
    offline: 'Works offline on the showroom tablet (LocalStorage enabled).',
    admin: 'View Admin Dashboard',
    preview: 'Live room visualization',
    previewHint: 'Selections update in real-time on the canvas.'
  },
  hi: {
    hero: 'खरीदारी से पहले पूरा इंटीरियर प्रीव्यू बनाएं।',
    customer: 'ग्राहक विवरण',
    name: 'ग्राहक का नाम',
    phone: 'व्हाट्सऐप नंबर',
    notes: 'आवश्यकताएँ / नोट्स',
    save: 'डिज़ाइन सेव करें और कोड बनाएँ',
    share: 'व्हाट्सऐप पर शेयर करें',
    savedCode: 'डिज़ाइन कोड के साथ सेव हुआ',
    shareHint: 'ग्राहक को तुरंत प्रीव्यू भेजें।',
    offline: 'शोरूम टैबलेट पर ऑफ़लाइन चलेगा (LocalStorage सक्षम)।',
    admin: 'एडमिन डैशबोर्ड देखें',
    preview: 'लाइव रूम विज़ुअलाइज़ेशन',
    previewHint: 'सेलेक्शन बदलते ही कैनवास अपडेट होता है।'
  }
};

const createCode = () => {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12);
  const random = Math.floor(Math.random() * 900 + 100);
  return `SM-${stamp}-${random}`;
};

const getStoredDesigns = (): SavedDesign[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedDesign[];
  } catch {
    return [];
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [room, setRoom] = useState<RoomType>('Bedroom');
  const [laminate, setLaminate] = useState(laminates[0]);
  const [hardware, setHardware] = useState(hardwareOptions[0]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [savedCode, setSavedCode] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredDesigns();
    if (stored.length === 0) return;
    const last = stored[stored.length - 1];
    setRoom(last.room);
    setLaminate(last.laminate);
    setHardware(last.hardware);
  }, []);

  const shareText = useMemo(() => {
    const summary = `Sri Majisa Design ${savedCode ?? ''}`.trim();
    return `${summary}%0A${room} | ${laminate} | ${hardware}%0A${notes}`;
  }, [room, laminate, hardware, notes, savedCode]);

  const handleSave = () => {
    const code = createCode();
    const newDesign: SavedDesign = {
      code,
      customerName,
      phone,
      room,
      laminate,
      hardware,
      notes,
      createdAt: new Date().toISOString()
    };

    const stored = getStoredDesigns();
    const updated = [...stored, newDesign];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedCode(code);
  };

  const shareUrl = phone
    ? `https://wa.me/${phone}?text=${shareText}`
    : `https://wa.me/?text=${shareText}`;

  return (
    <div>
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="container">
        <p className="small">{labels[language].hero}</p>
        <div className="grid">
          <section className="card">
            <h2>{labels[language].preview}</h2>
            <p className="small">{labels[language].previewHint}</p>
            <RoomCanvas room={room} laminate={laminate} hardware={hardware} language={language} />
          </section>
          <section className="card">
            <SelectionPanel
              room={room}
              laminate={laminate}
              hardware={hardware}
              rooms={rooms}
              laminates={laminates}
              hardwareOptions={hardwareOptions}
              language={language}
              onRoomChange={setRoom}
              onLaminateChange={setLaminate}
              onHardwareChange={setHardware}
            />
            <hr style={{ border: '1px solid var(--border)', margin: '16px 0' }} />
            <div className="controls">
              <h3>{labels[language].customer}</h3>
              <label>
                {labels[language].name}
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Sita Devi"
                />
              </label>
              <label>
                {labels[language].phone}
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="919999999999"
                />
              </label>
              <label>
                {labels[language].notes}
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={language === 'en' ? 'Preferred handles, delivery date...' : 'हैंडल पसंद, डिलीवरी तारीख...'}
                />
              </label>
            </div>
            <div className="footer-bar">
              <div className="footer-actions">
                <button type="button" onClick={handleSave}>
                  {labels[language].save}
                </button>
                <a href={shareUrl} target="_blank" rel="noreferrer">
                  <button type="button" className="secondary">
                    {labels[language].share}
                  </button>
                </a>
              </div>
              {savedCode && (
                <p className="small" style={{ marginTop: 8 }}>
                  {labels[language].savedCode}: <strong>{savedCode}</strong>
                </p>
              )}
              <p className="small">{labels[language].shareHint}</p>
            </div>
          </section>
        </div>
        <section className="card" style={{ marginTop: 16 }}>
          <p className="small">{labels[language].offline}</p>
          <a className="badge" href="/admin">
            {labels[language].admin}
          </a>
        </section>
      </main>
    </div>
  );
}
