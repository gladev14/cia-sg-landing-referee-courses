import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RegistrationForm } from './components/RegistrationForm';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById('form-iscrizione');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar onScrollToForm={scrollToForm} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onCtaClick={scrollToForm} />

        {/* The Core Registration Form with dynamic province selector */}
        <RegistrationForm
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Course Advantages & Perks */}
        <Benefits />

        {/* 3-Step Process: How it Works */}
        <HowItWorks onCtaClick={scrollToForm} />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={() => setPrivacyModalOpen(true)} />

      {/* Privacy Policy Modal (GDPR) */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
