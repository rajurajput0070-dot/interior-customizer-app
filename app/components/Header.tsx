'use client';

interface HeaderProps {
  language: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const text = {
    en: {
      name: 'Sri Majisa Plywood & Interior Hardware',
      subtitle: 'Instant visualization for laminates & hardware',
      toggle: 'हिन्दी'
    },
    hi: {
      name: 'श्री माजिसा प्लाइवुड और इंटीरियर हार्डवेयर',
      subtitle: 'लैमिनेट और हार्डवेयर का तुरंत प्रीव्यू',
      toggle: 'English'
    }
  };

  return (
    <header>
      <div className="container hero">
        <span className="badge">Showroom Tablet Ready</span>
        <h1 style={{ margin: 0 }}>{text[language].name}</h1>
        <p style={{ margin: 0, color: 'var(--muted)' }}>{text[language].subtitle}</p>
        <button
          className="secondary"
          type="button"
          onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
          aria-label="Toggle language"
        >
          {text[language].toggle}
        </button>
      </div>
    </header>
  );
}
