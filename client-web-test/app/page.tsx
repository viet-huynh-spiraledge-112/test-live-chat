import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import FeatureHighlights from '@/components/FeatureHighlights';
import TabbedSection from '@/components/TabbedSection';
import CertificationsSection from '@/components/CertificationsSection';
import CollaborationSection from '@/components/CollaborationSection';
import MobileSection from '@/components/MobileSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PurposeSection from '@/components/PurposeSection';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeatureCards />
      <FeatureHighlights />
      <TabbedSection />
      <CertificationsSection />
      <CollaborationSection />
      <MobileSection />
      <TestimonialsSection />
      <PurposeSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}
