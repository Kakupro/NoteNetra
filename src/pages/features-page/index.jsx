import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FeatureHero from './components/FeatureHero';
import FeatureNavigation from './components/FeatureNavigation';
import TransactionTrackingSection from './components/TransactionTrackingSection';
import CreditEngineSection from './components/CreditEngineSection';
import InvoicingSection from './components/InvoicingSection';
import StorefrontSection from './components/StorefrontSection';
import ComparisonSection from './components/ComparisonSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-spacing">
        <Breadcrumb />
        <FeatureHero />
        <FeatureNavigation />
        <TransactionTrackingSection />
        <CreditEngineSection />
        <InvoicingSection />
        <StorefrontSection />
        <ComparisonSection />
        <TestimonialSection />
        <CTASection />
      </main>
    </div>
  );
};

export default FeaturesPage;
