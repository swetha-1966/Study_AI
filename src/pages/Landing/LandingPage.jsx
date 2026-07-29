import React from 'react';
import { Hero } from '../../components/landing/Hero/Hero';
import { Stats } from '../../components/landing/Stats/Stats';
import { Features } from '../../components/landing/Features/Features';
import { Workflow } from '../../components/landing/Workflow/Workflow';
import { Showcase } from '../../components/landing/Showcase/Showcase';
import { Testimonials } from '../../components/landing/Testimonials/Testimonials';
import { FAQ } from '../../components/landing/FAQ/FAQ';
import { CTA } from '../../components/landing/CTA/CTA';
import { Footer } from '../../components/landing/Footer/Footer';

export function LandingPage({ onStart, onDemo }) {
  return (
    <div className="w-full space-y-4">
      <Hero onStart={onStart} onDemo={onDemo} />
      <Stats />
      <Features />
      <Workflow />
      <Showcase />
      <Testimonials />
      <FAQ />
      <CTA onStart={onStart} />
      <Footer />
    </div>
  );
}
