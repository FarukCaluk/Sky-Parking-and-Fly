import { FaqTeaser } from '@/components/sections/FaqTeaser';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Lot } from '@/components/sections/Lot';
import { NewsTeaser } from '@/components/sections/NewsTeaser';
import { PriceLadder } from '@/components/sections/PriceLadder';
import { ReviewsMarquee } from '@/components/sections/ReviewsMarquee';
import { PageShell } from './PageShell';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <ReviewsMarquee />
      <Journey />
      <PriceLadder />
      <Lot />
      <NewsTeaser />
      <FaqTeaser />
    </PageShell>
  );
}
