import { Hero } from '@/components/sections/Hero';
import { HomeTeasers } from '@/components/sections/HomeTeasers';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PageShell } from './PageShell';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <HowItWorks />
      <HomeTeasers />
    </PageShell>
  );
}
