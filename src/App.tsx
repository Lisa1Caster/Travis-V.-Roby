/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Check,
  Copy,
  ChevronDown,
  Navigation,
  ShieldCheck,
  Wrench,
  Clock,
  Droplets,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: 'urgent' | 'fixtures' | 'drainage';
  categoryLabel: string;
  summary: string;
  details: string;
  featured?: boolean;
}

type ThemeKey = 'navy-brass' | 'emerald-champagne' | 'obsidian-copper';

const THEMES: { key: ThemeKey; label: string; primaryHex: string; accentHex: string }[] = [
  {
    key: 'navy-brass',
    label: 'Oxford Navy & Brass',
    primaryHex: '#111C2D',
    accentHex: '#D4AF6A',
  },
  {
    key: 'emerald-champagne',
    label: 'Heritage Green & Gold',
    primaryHex: '#132822',
    accentHex: '#D8B472',
  },
  {
    key: 'obsidian-copper',
    label: 'Obsidian & Copper',
    primaryHex: '#1C1917',
    accentHex: '#E08E68',
  },
];

const SERVICES: ServiceItem[] = [
  {
    id: 'emergency-plumbing',
    index: '01',
    title: 'Emergency Plumbing',
    category: 'urgent',
    categoryLabel: 'Urgent Response',
    summary:
      'Rapid fault isolation and repair for sudden pipe bursts, severe water leaks, overflowing fixtures, and loss of household water supply.',
    details:
      'Direct phone and WhatsApp response across Shoreham-By-Sea to contain water damage quickly and restore safe operation.',
    featured: true,
  },
  {
    id: 'leak-repair',
    index: '02',
    title: 'Leak Repair',
    category: 'urgent',
    categoryLabel: 'Diagnostics & Repair',
    summary:
      'Pinpoint detection and permanent sealing for concealed pipe leaks, dripping joints, radiator valves, and under-sink moisture.',
    details:
      'Methodical tracing to stop dampness and structural damage without unnecessary disruption to walls or flooring.',
    featured: true,
  },
  {
    id: 'pipe-repair',
    index: '03',
    title: 'Pipe Repair',
    category: 'urgent',
    categoryLabel: 'Infrastructure',
    summary:
      'Structural repair and replacement of corroded, noisy, or damaged copper and modern domestic pipework.',
    details:
      'Clean re-routing, secure jointing, and pressure-tested pipework engineered for quiet, long-term reliability.',
  },
  {
    id: 'water-heater-services',
    index: '04',
    title: 'Water Heater Services',
    category: 'drainage',
    categoryLabel: 'Hot Water Systems',
    summary:
      'Diagnostics, servicing, valve replacement, and installation for domestic water heaters and hot water cylinders.',
    details:
      'Restoring consistent water temperature, balanced pressure, and dependable daily hot water delivery.',
    featured: true,
  },
  {
    id: 'drain-cleaning',
    index: '05',
    title: 'Drain Cleaning',
    category: 'drainage',
    categoryLabel: 'Flow & Drainage',
    summary:
      'Thorough clearing of slow-draining sinks, showers, baths, and blocked internal or external domestic waste lines.',
    details:
      'Removes grease, scale, and debris build-up to restore full flow capacity and prevent recurring backups.',
  },
  {
    id: 'sewer-line-repair',
    index: '06',
    title: 'Sewer Line Repair',
    category: 'drainage',
    categoryLabel: 'Main Waste Lines',
    summary:
      'Targeted repair and unblocking for damaged, backed-up, or restricted residential sewer connections.',
    details:
      'Addresses persistent foul odours, multiple slow drains, and underground waste pipe defects safely.',
  },
  {
    id: 'sump-pump-services',
    index: '07',
    title: 'Sump Pump Services',
    category: 'drainage',
    categoryLabel: 'Water Management',
    summary:
      'Inspection, float switch testing, repair, and installation of residential sump pumps for basements and low-lying spaces.',
    details:
      'Protects coastal and lower-ground properties in Shoreham-By-Sea from groundwater accumulation.',
  },
  {
    id: 'bathroom-plumbing',
    index: '08',
    title: 'Bathroom Plumbing',
    category: 'fixtures',
    categoryLabel: 'Complete Rooms',
    summary:
      'Full plumbing installation and upgrades for baths, walk-in showers, basins, concealed cisterns, and wet-room pipework.',
    details:
      'Precision finishing suited to contemporary and luxury residential bathrooms.',
    featured: true,
  },
  {
    id: 'kitchen-plumbing',
    index: '09',
    title: 'Kitchen Plumbing',
    category: 'fixtures',
    categoryLabel: 'Complete Rooms',
    summary:
      'Plumbing for kitchen sinks, mixer taps, dishwashers, washing machines, water filters, and under-counter waste pipework.',
    details:
      'Neatly organized under-sink layouts that maximize cabinet space and ensure leak-free appliance connections.',
  },
  {
    id: 'toilet-repair',
    index: '10',
    title: 'Toilet Repair',
    category: 'fixtures',
    categoryLabel: 'Fixture Servicing',
    summary:
      'Repair of constantly running cisterns, faulty flush syphons, fill valves, weak flushes, and base seal leaks.',
    details:
      'Quiet, water-efficient cistern mechanics repaired using durable replacement components.',
  },
  {
    id: 'faucet-repair',
    index: '11',
    title: 'Faucet Repair',
    category: 'fixtures',
    categoryLabel: 'Fixture Servicing',
    summary:
      'Cartridge replacement, seal renewal, and new tap installations for dripping or stiff kitchen and bathroom faucets.',
    details:
      'Careful handling of brushed brass, chrome, graphite, and specialist architectural tapware.',
  },
  {
    id: 'garbage-disposal-repair',
    index: '12',
    title: 'Garbage Disposal Repair',
    category: 'fixtures',
    categoryLabel: 'Kitchen Systems',
    summary:
      'Unjamming, leak sealing, electrical reset troubleshooting, and replacement of under-sink waste disposal units.',
    details:
      'Restores clean, vibration-free kitchen sink drainage and safe waste unit operation.',
  },
];

const FAQS = [
  {
    question: 'How do I reach Travis V. Roby for urgent or emergency plumbing?',
    answer:
      'For urgent issues such as active leaks, burst pipes, or sudden loss of water, call +44 7985 248298 directly or send a message on WhatsApp to the same number. Sharing a photo or short video of the issue on WhatsApp allows for immediate assessment before arrival.',
  },
  {
    question: 'What areas do you cover from Windlesham Gardens?',
    answer:
      'Based at 7 Windlesham Gardens, Shoreham-By-Sea, England, BN43 5AD, services are provided directly to homeowners and residential properties across Shoreham-By-Sea and the surrounding BN43 area.',
  },
  {
    question: 'Can I send photos of a plumbing problem on WhatsApp for an initial quote?',
    answer:
      'Yes. Messaging on WhatsApp (+44 7985 248298) with a brief description and a clear photo of the tap, pipework, water heater, or leak helps identify the required parts and provide clear, practical next steps right away.',
  },
  {
    question: 'Do you handle both small fixture repairs and complete bathroom or kitchen plumbing?',
    answer:
      'Yes. Work covers everything from individual faucet repairs, running toilets, and blocked drains through to water heater services, sump pumps, sewer line repairs, and complete bathroom and kitchen plumbing installations.',
  },
];

const PHONE_RAW = '447985248298';
const PHONE_DISPLAY = '+44 7985 248298';
const PHONE_LOCAL_DISPLAY = '07985 248298';
const ADDRESS_FULL = '7 Windlesham Gardens, Shoreham-By-Sea, England, BN43 5AD';
const MAPS_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=7+Windlesham+Gardens,+Shoreham-By-Sea,+England,+BN43+5AD';

function buildWhatsAppUrl(customMessage?: string) {
  const base = `https://wa.me/${PHONE_RAW}`;
  if (!customMessage) {
    return `${base}?text=${encodeURIComponent(
      'Hello Travis, I am getting in touch regarding plumbing services in Shoreham-By-Sea.'
    )}`;
  }
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

export default function App() {
  const [theme, setTheme] = useState<ThemeKey>('navy-brass');
  const [activeCategory, setActiveCategory] = useState<'all' | 'urgent' | 'fixtures' | 'drainage'>('all');
  const [selectedService, setSelectedService] = useState<string>('Emergency Plumbing');
  const [urgency, setUrgency] = useState<'standard' | 'urgent'>('standard');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPostcode, setCustomerPostcode] = useState<string>('BN43');
  const [issueNotes, setIssueNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [inquiryPrepared, setInquiryPrepared] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'address' | 'message' | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  const handleCopy = (text: string, field: 'phone' | 'address' | 'message') => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedField(field);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
    }, 2200);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    if (serviceTitle === 'Emergency Plumbing' || serviceTitle === 'Leak Repair') {
      setUrgency('urgent');
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const composedMessage = `Hello Travis, I would like to inquire about ${selectedService}${
    urgency === 'urgent' ? ' (Urgent)' : ''
  }.${customerName.trim() ? ` Name: ${customerName.trim()}.` : ''}${
    customerPostcode.trim() ? ` Location/Postcode: ${customerPostcode.trim()}.` : ''
  }${issueNotes.trim() ? ` Details: ${issueNotes.trim()}` : ''}`;

  const handlePrepareWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      setFormError('Please select a plumbing service.');
      return;
    }
    setFormError('');
    setInquiryPrepared(true);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--color-primary)] transition-colors duration-200"
    >
      {/* Top Bar Contract: Strictly 1 row, 3 zones (Brand Wordmark — 5 Nav Links — Primary Actions) */}
      <header className="sticky top-0 z-40 h-16 bg-[var(--color-primary)]/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
          >
            Travis V. Roby
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-200"
          >
            <a
              href="#services"
              className="hover:text-[var(--color-accent)] hover:underline underline-offset-8 decoration-[var(--color-accent)]/70 transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-[var(--color-accent)] hover:underline underline-offset-8 decoration-[var(--color-accent)]/70 transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#why-us"
              className="hover:text-[var(--color-accent)] hover:underline underline-offset-8 decoration-[var(--color-accent)]/70 transition-colors whitespace-nowrap"
            >
              Why Choose Us
            </a>
            <a
              href="#service-area"
              className="hover:text-[var(--color-accent)] hover:underline underline-offset-8 decoration-[var(--color-accent)]/70 transition-colors whitespace-nowrap"
            >
              Service Area
            </a>
            <a
              href="#contact"
              className="hover:text-[var(--color-accent)] hover:underline underline-offset-8 decoration-[var(--color-accent)]/70 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:+${PHONE_RAW}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-100 hover:text-[var(--color-accent)] transition-colors whitespace-nowrap shrink-0 font-mono-tabular focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative bg-[var(--color-primary)] text-white overflow-hidden border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Core Proposition & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Unboxed quiet metadata line — Zero-Pill Discipline */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[var(--color-accent)] tracking-wide">
                  <span>Shoreham-By-Sea, England</span>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span className="font-mono-tabular text-stone-200">BN43 5AD</span>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span className="text-stone-200">Residential Plumber</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-stone-300 tracking-wide">
                    Travis V. Roby — Local Plumbing Specialist
                  </p>
                  <h1
                    className="font-display text-3xl sm:text-5xl lg:text-[54px] font-semibold text-white leading-[1.1] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Plumbing That Works Smarter.
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-[62ch]">
                  From urgent leak repairs and emergency callouts to complete bathroom and kitchen plumbing, Travis V. Roby delivers clean, methodical plumbing work for homes across Shoreham-By-Sea.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>Message on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>

                  <a
                    href={`tel:+${PHONE_RAW}`}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/15 transition-colors whitespace-nowrap shrink-0 font-mono-tabular focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                    <span>Call {PHONE_DISPLAY}</span>
                  </a>
                </div>

                {/* Local Trust Signal */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-300">
                  <div>
                    <div className="font-semibold text-white">Local Base</div>
                    <div className="mt-0.5 text-stone-300">7 Windlesham Gardens, BN43 5AD</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">12 Core Disciplines</div>
                    <div className="mt-0.5 text-stone-300">Emergency, Repairs & Installations</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Contact</div>
                    <div className="mt-0.5 font-mono-tabular text-stone-300">WhatsApp & Phone Line</div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact 16:9 Architectural Hero Visual */}
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden border border-white/15 bg-[var(--color-primary-dark)] shadow-xl">
                  <div className="aspect-video lg:aspect-[4/3] w-full relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-stone-900">
                    <img
                      src="/src/assets/images/hero_luxury_plumbing_1790707027899.jpg"
                      alt="Contemporary luxury bathroom plumbing installation in Shoreham-By-Sea"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-[var(--color-accent)] font-medium">
                          Shoreham-By-Sea · West Sussex
                        </p>
                        <p className="text-sm sm:text-base font-medium text-white mt-0.5">
                          Precision diagnostics, repairs, and modern fixture installations
                        </p>
                      </div>
                      <a
                        href={MAPS_SEARCH_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-md transition-colors whitespace-nowrap shrink-0"
                        title="View 7 Windlesham Gardens on Google Maps"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        <span>BN43 5AD</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES SECTION */}
        <section id="services" className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--color-primary)]/10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <span>Core Capabilities</span>
                <span aria-hidden="true">·</span>
                <span>12 Plumbing Services</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Comprehensive Residential Plumbing Services
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Every job is approached with accurate fault-finding and tidy workmanship. Select a category below or choose any service to start a direct WhatsApp inquiry.
              </p>
            </div>

            {/* Interactive Filter Controls (Functional Buttons) */}
            <div
              role="tablist"
              aria-label="Filter plumbing services by type"
              className="flex flex-wrap items-center gap-1 p-1.5 bg-[var(--bg-subtle)] rounded-lg self-start lg:self-auto"
            >
              {[
                { key: 'all', label: 'All Services (12)' },
                { key: 'urgent', label: 'Emergency & Leaks (3)' },
                { key: 'fixtures', label: 'Bathrooms, Kitchens & Taps (5)' },
                { key: 'drainage', label: 'Drains, Water Heaters & Pumps (4)' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeCategory === tab.key}
                  onClick={() => setActiveCategory(tab.key as typeof activeCategory)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'text-[var(--color-primary)]/75 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid — Single-elevation cards with clean editorial numbering */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group bg-white rounded-xl border border-[var(--color-primary)]/10 p-6 flex flex-col justify-between hover:border-[var(--color-accent)] transition-colors"
              >
                <div>
                  {/* Quiet 1-line unboxed metadata kicker */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--color-muted)] mb-3">
                    <span className="font-mono-tabular font-semibold text-[var(--color-accent-deep)]">
                      {service.index}. {service.categoryLabel}
                    </span>
                    <span>Shoreham-By-Sea</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--color-primary)] tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                    {service.summary}
                  </p>

                  <p className="mt-3 pt-3 border-t border-stone-100 text-xs text-[var(--color-muted)] leading-relaxed">
                    {service.details}
                  </p>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello Travis, I need help with ${service.title} at my property in Shoreham-By-Sea.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-deep)] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[var(--color-accent-deep)]" />
                    <span>WhatsApp about {service.title}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleSelectServiceForInquiry(service.title)}
                    className="text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                  >
                    Prepare Quote
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Visual Craftsmanship Showcase Strip inside Services */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-primary)]">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src="/src/assets/images/service_bathroom_kitchen_1790707041120.jpg"
                  alt="Precision mixer tap and basin installation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <div className="text-xs text-[var(--color-accent)] mb-1">
                    Bathroom Plumbing · Kitchen Plumbing · Faucet & Toilet Repair
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    Refined Fixture Installations & Upgrades
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-md">
                    Careful fitting of taps, basins, toilets, showers, and kitchen appliances with clean silicone work and balanced water pressure.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-primary)]">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src="/src/assets/images/service_pipe_diagnostics_1790707052938.jpg"
                  alt="Organized residential pipework and hot water cylinder system"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <div className="text-xs text-[var(--color-accent)] mb-1">
                    Water Heater Services · Pipe Repair · Sump Pump Services
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    Smarter Diagnostics & System Reliability
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-md">
                    Structured pipe repairs, water heater maintenance, and drainage solutions that address the root cause rather than temporary patchworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" className="py-16 sm:py-24 bg-white border-y border-[var(--color-primary)]/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <span>About the Business</span>
                  <span aria-hidden="true">·</span>
                  <span>Travis V. Roby</span>
                </div>

                <h2
                  className="font-display text-2xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  A Local Shoreham-By-Sea Plumber Focused on Lasting Workmanship
                </h2>

                <p className="text-base text-[var(--color-muted)] leading-relaxed">
                  Operating from <strong className="font-semibold text-[var(--color-primary)]">7 Windlesham Gardens, Shoreham-By-Sea, BN43 5AD</strong>, Travis V. Roby provides dedicated residential plumbing guided by a simple principle: <em>Plumbing That Works Smarter.</em>
                </p>

                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Instead of rushed callouts or guesswork, every repair and installation begins with a clear look at how your home’s water supply, heating cylinder, fixtures, and drainage work together. Whether resolving an urgent leak, clearing a stubborn drain, repairing a sewer line, or plumbing a new kitchen or bathroom, the goal is always a clean, durable result.
                </p>

                <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Direct Point of Contact</div>
                    <div className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                      Speak directly with Travis V. Roby
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Base Location</div>
                    <div className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                      Shoreham-By-Sea, BN43 5AD
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:+${PHONE_RAW}`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-lg hover:bg-[var(--bg-canvas)] transition-colors whitespace-nowrap font-mono-tabular"
                  >
                    <Phone className="w-4 h-4 text-[var(--color-accent-deep)]" />
                    <span>{PHONE_LOCAL_DISPLAY}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-primary)]">
                  <div className="aspect-[4/3] w-full relative">
                    <img
                      src="/src/assets/images/about_shoreham_craft_1790707064479.jpg"
                      alt="Modern coastal residential plumbing detail in Shoreham-By-Sea"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 sm:p-6 bg-[var(--color-primary)] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[var(--color-accent)]">Plumbing That Works Smarter.</div>
                      <div className="text-sm font-medium text-white mt-0.5">
                        7 Windlesham Gardens, Shoreham-By-Sea, England, BN43 5AD
                      </div>
                    </div>
                    <a
                      href={MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline whitespace-nowrap shrink-0"
                    >
                      <span>View on Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRUST / WHY CHOOSE US & 5. CREDIBILITY / REASSURANCE SECTION */}
        <section id="why-us" className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
              <span>Why Choose Travis V. Roby</span>
              <span aria-hidden="true">·</span>
              <span>Practical Standards</span>
            </div>
            <h2
              className="font-display text-2xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Practical Reasons Local Homeowners Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              Clear communication, direct local accountability in Shoreham-By-Sea, and complete residential coverage across twelve core plumbing services.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[var(--color-primary)]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-4">
                <span className="font-mono-tabular font-semibold text-[var(--color-accent-deep)]">01. Local Proximity</span>
                <span>BN43 5AD</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                Genuinely Local to Shoreham-By-Sea
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                Based right at 7 Windlesham Gardens, Shoreham-By-Sea. You are dealing with a local plumber in your immediate area rather than a national call-centre or distant contractor network.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[var(--color-primary)]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-4">
                <span className="font-mono-tabular font-semibold text-[var(--color-accent-deep)]">02. Fast Assessment</span>
                <span>WhatsApp & Phone</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                Direct WhatsApp Photo & Video Triage
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                Message directly on WhatsApp ({PHONE_DISPLAY}) with details or a quick photo of your leak, tap, drain, or water heater so Travis V. Roby can assess the issue and arrive prepared.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[var(--color-primary)]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-4">
                <span className="font-mono-tabular font-semibold text-[var(--color-accent-deep)]">03. Complete Scope</span>
                <span>12 Core Services</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                Single Specialist for Repairs, Drains & Room Installations
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                From emergency plumbing, drain cleaning, and sewer line repair to sump pumps, garbage disposals, and complete bathroom and kitchen plumbing—handled under one roof.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[var(--color-primary)]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-4">
                <span className="font-mono-tabular font-semibold text-[var(--color-accent-deep)]">04. Smarter Approach</span>
                <span>Methodical Work</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                Focused on Root-Cause Resolution
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
                "Plumbing That Works Smarter" means diagnosing why a pipe failed, why a drain backs up, or why pressure dropped—explaining the fix clearly before work begins.
              </p>
            </div>
          </div>

          {/* 5. CREDIBILITY / SERVICE ASSURANCE BANNER */}
          <div className="mt-10 bg-[var(--color-primary)] text-white rounded-xl p-6 sm:p-10 border border-[var(--color-primary)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[var(--color-accent)]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Service Commitment & Reassurance</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  What You Can Expect When You Contact Travis V. Roby
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
                  Every call or WhatsApp message goes straight to Travis V. Roby. You receive a clear explanation of what is wrong, practical options for repair or replacement, and respectful care for your home and fixtures from start to finish.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-200">
                  <span className="inline-flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Clear diagnostic explanation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Clean, respectful home protection
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Prompt WhatsApp & phone response
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-end">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors whitespace-nowrap w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Message on WhatsApp</span>
                </a>
                <a
                  href={`tel:+${PHONE_RAW}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-white/10 text-white border border-white/15 rounded-lg hover:bg-white/15 transition-colors whitespace-nowrap font-mono-tabular w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                  <span>Call {PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. LOCATION / SERVICE AREA SECTION */}
        <section id="service-area" className="py-16 sm:py-20 bg-white border-y border-[var(--color-primary)]/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                    <span>Location & Service Area</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">BN43 5AD</span>
                  </div>
                  <h2
                    className="font-display text-2xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Serving Shoreham-By-Sea from Windlesham Gardens
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                    Conveniently situated at 7 Windlesham Gardens in Shoreham-By-Sea, England (BN43 5AD), providing responsive local plumbing callouts, scheduled maintenance, and installations.
                  </p>
                </div>

                <div className="bg-[var(--bg-canvas)] rounded-xl p-6 border border-[var(--color-primary)]/10 space-y-4">
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Registered Business Address</div>
                    <div className="mt-1 text-base font-semibold text-[var(--color-primary)]">
                      7 Windlesham Gardens
                    </div>
                    <div className="text-sm text-[var(--color-muted)]">
                      Shoreham-By-Sea, England, <span className="font-mono-tabular font-medium text-[var(--color-primary)]">BN43 5AD</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-primary)]/10 flex flex-wrap items-center gap-3">
                    <a
                      href={MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
                    >
                      <Navigation className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(ADDRESS_FULL, 'address')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-white border border-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-lg hover:bg-stone-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedField === 'address' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-700" />
                          <span>Address Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[var(--color-muted)]" />
                          <span>Copy Full Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Architectural Local Coverage Card */}
              <div className="lg:col-span-6 bg-[var(--color-primary)] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between border border-[var(--color-primary)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <div className="text-xs text-[var(--color-accent)]">Local Coverage Reference</div>
                      <div className="font-display text-lg font-semibold mt-0.5">
                        Shoreham-By-Sea & BN43 Postcode Sector
                      </div>
                    </div>
                    <MapPin className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed">
                    Whether you need emergency leak isolation, a replacement water heater, drain unblocking, or new bathroom and kitchen plumbing, being locally based in BN43 5AD means straightforward scheduling and dependable follow-up.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200">
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[var(--color-accent)] font-medium">Primary Base</div>
                      <div className="mt-1 font-semibold text-white">7 Windlesham Gardens</div>
                      <div className="text-stone-300 mt-0.5">Shoreham-By-Sea, BN43 5AD</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[var(--color-accent)] font-medium">Direct Line & WhatsApp</div>
                      <div className="mt-1 font-semibold text-white font-mono-tabular">{PHONE_DISPLAY}</div>
                      <div className="text-stone-300 mt-0.5">Click to call or message anytime</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
                  <span>Need directions or want to check availability for your street?</span>
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Travis, I am in Shoreham-By-Sea and would like to check your availability for plumbing work.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Ask on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT / ACTION SECTION */}
        <section id="contact" className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Direct Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <span>Direct Contact</span>
                  <span aria-hidden="true">·</span>
                  <span>Travis V. Roby</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Get in Touch for Repairs, Quotes, or Urgent Plumbing
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Reach Travis V. Roby directly by WhatsApp or phone. No middlemen or automated queues.
                </p>
              </div>

              {/* Primary Action Cards */}
              <div className="space-y-4">
                <div className="bg-[var(--color-primary)] text-white rounded-xl p-6 border border-[var(--color-primary)]">
                  <div className="text-xs text-[var(--color-accent)] font-medium">Recommended for Fast Assessment</div>
                  <h3 className="font-display text-xl font-semibold mt-1">
                    Message on WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
                    Send a message or attach a photo of the plumbing issue directly to <span className="font-mono-tabular text-white">{PHONE_DISPLAY}</span>.
                  </p>
                  <div className="mt-4">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors w-full sm:w-auto whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Message on WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[var(--color-primary)]/10">
                  <div className="text-xs text-[var(--color-muted)] font-medium">Direct Telephone Line</div>
                  <div className="font-mono-tabular text-xl font-semibold text-[var(--color-primary)] mt-1">
                    {PHONE_DISPLAY}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                    UK Mobile: <span className="font-mono-tabular">{PHONE_LOCAL_DISPLAY}</span> — Speak directly with Travis V. Roby.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:+${PHONE_RAW}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>Call Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(PHONE_DISPLAY, 'phone')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-[var(--bg-canvas)] border border-[var(--color-primary)]/15 text-[var(--color-primary)] rounded-lg hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-700" />
                          <span>Phone Number Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[var(--color-muted)]" />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[var(--color-primary)]/10">
                  <div className="text-xs text-[var(--color-muted)] font-medium">Address</div>
                  <div className="text-sm sm:text-base font-semibold text-[var(--color-primary)] mt-1">
                    {ADDRESS_FULL}
                  </div>
                  <div className="mt-3">
                    <a
                      href={MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-deep)]" />
                      <span>Get Directions on Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Service Inquiry & WhatsApp Message Builder */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-[var(--color-primary)]/15 p-6 sm:p-8">
                <div className="border-b border-stone-100 pb-5">
                  <div className="text-xs text-[var(--color-muted)]">Quick Service Request</div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--color-primary)] mt-1">
                    Prepare Your Plumbing Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                    Select the service you need below to format a clear inquiry for Travis V. Roby via WhatsApp or phone.
                  </p>
                </div>

                <form onSubmit={handlePrepareWhatsApp} className="mt-6 space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="service-select"
                        className="block text-xs font-semibold text-[var(--color-primary)] mb-2"
                      >
                        Service Needed
                      </label>
                      <select
                        id="service-select"
                        value={selectedService}
                        onChange={(e) => {
                          setSelectedService(e.target.value);
                          setInquiryPrepared(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-canvas)] border border-[var(--color-primary)]/20 rounded-lg text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.index}. {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-primary)] mb-2">
                        Urgency
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--bg-canvas)] rounded-lg border border-[var(--color-primary)]/15">
                        <button
                          type="button"
                          onClick={() => {
                            setUrgency('standard');
                            setInquiryPrepared(false);
                          }}
                          className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                            urgency === 'standard'
                              ? 'bg-[var(--color-primary)] text-white'
                              : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
                          }`}
                        >
                          Standard Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUrgency('urgent');
                            setInquiryPrepared(false);
                          }}
                          className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                            urgency === 'urgent'
                              ? 'bg-[var(--color-primary)] text-[var(--color-accent)]'
                              : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
                          }`}
                        >
                          Urgent / Emergency
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="customer-name"
                        className="block text-xs font-semibold text-[var(--color-primary)] mb-2"
                      >
                        Your Name (Optional)
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          setInquiryPrepared(false);
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-canvas)] border border-[var(--color-primary)]/20 rounded-lg text-[var(--color-primary)] placeholder:text-stone-400 focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="customer-postcode"
                        className="block text-xs font-semibold text-[var(--color-primary)] mb-2"
                      >
                        Street or Postcode in Shoreham-By-Sea
                      </label>
                      <input
                        id="customer-postcode"
                        type="text"
                        value={customerPostcode}
                        onChange={(e) => {
                          setCustomerPostcode(e.target.value);
                          setInquiryPrepared(false);
                        }}
                        placeholder="e.g. BN43 5AD"
                        className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-canvas)] border border-[var(--color-primary)]/20 rounded-lg text-[var(--color-primary)] placeholder:text-stone-400 focus:outline-none focus:border-[var(--color-primary)] font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="issue-notes"
                      className="block text-xs font-semibold text-[var(--color-primary)] mb-2"
                    >
                      Brief Description of the Plumbing Job or Issue
                    </label>
                    <textarea
                      id="issue-notes"
                      rows={3}
                      value={issueNotes}
                      onChange={(e) => {
                        setIssueNotes(e.target.value);
                        setInquiryPrepared(false);
                      }}
                      placeholder="Describe the leak, drain issue, water heater symptom, or fixture installation needed..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-canvas)] border border-[var(--color-primary)]/20 rounded-lg text-[var(--color-primary)] placeholder:text-stone-400 focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs font-medium text-red-700" role="alert">
                      {formError}
                    </p>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={buildWhatsAppUrl(composedMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Send Inquiry on WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Preview & Copy Message</span>
                    </button>
                  </div>
                </form>

                {inquiryPrepared && (
                  <div className="mt-6 p-4 rounded-lg bg-[var(--bg-canvas)] border border-[var(--color-primary)]/15 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[var(--color-primary)]">
                        Ready-to-Send Inquiry Summary
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(composedMessage, 'message')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                      >
                        {copiedField === 'message' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[var(--color-primary)] bg-white p-3 rounded border border-stone-200 leading-relaxed">
                      {composedMessage}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={buildWhatsAppUrl(composedMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-deep)] hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Open WhatsApp with this message ({PHONE_DISPLAY})</span>
                      </a>
                      <span className="text-stone-300">·</span>
                      <a
                        href={`tel:+${PHONE_RAW}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline font-mono-tabular"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Or call {PHONE_DISPLAY}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8. OPTIONAL FAQ SECTION */}
        <section className="py-16 bg-white border-t border-[var(--color-primary)]/10">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <span>Common Questions</span>
                <span aria-hidden="true">·</span>
                <span>Shoreham-By-Sea Plumbing</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-primary)] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-[var(--color-primary)]/10 border-y border-[var(--color-primary)]/10">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={faq.question} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-[var(--color-primary)]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[var(--color-muted)] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pt-2 pb-3 pr-8 text-sm text-[var(--color-muted)] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 9. QUIET FOOTER WITH CURATED COLOR PALETTE SELECTOR */}
      <footer className="bg-[var(--color-primary)] text-stone-300 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            <div className="md:col-span-5 space-y-2.5">
              <div className="font-display text-xl font-semibold text-white">
                Travis V. Roby
              </div>
              <p className="text-sm text-[var(--color-accent)] font-medium">
                Plumbing That Works Smarter.
              </p>
              <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
                Residential Plumber based at 7 Windlesham Gardens, Shoreham-By-Sea, England, BN43 5AD.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
              <div className="font-semibold text-white">Contact & Location</div>
              <p className="text-stone-300">{ADDRESS_FULL}</p>
              <p className="font-mono-tabular">
                Phone:{' '}
                <a href={`tel:+${PHONE_RAW}`} className="text-white hover:text-[var(--color-accent)] underline underline-offset-4">
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className="font-mono-tabular">
                WhatsApp:{' '}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline underline-offset-4"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs sm:text-sm">
              <div className="font-semibold text-white">Navigation</div>
              <ul className="space-y-1.5 text-stone-300">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services (12)
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Travis V. Roby
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-white transition-colors">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#service-area" className="hover:text-white transition-colors">
                    Shoreham-By-Sea Location
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact & WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex flex-wrap items-center gap-2">
              <span>© {new Date().getFullYear()} Travis V. Roby.</span>
              <span aria-hidden="true">·</span>
              <span>7 Windlesham Gardens, Shoreham-By-Sea, BN43 5AD</span>
            </div>

            {/* Interactive Luxury Color Palette Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-400 mr-1">Color Palette:</span>
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTheme(t.key)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      theme === t.key
                        ? 'bg-white text-[#111C2D]'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: t.accentHex }}
                    />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
