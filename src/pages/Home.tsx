import { FaqTeaser } from '@/components/sections/FaqTeaser';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Lot } from '@/components/sections/Lot';
import { PriceLadder } from '@/components/sections/PriceLadder';
import { ReviewsWall } from '@/components/sections/ReviewsWall';
import { PageShell } from './PageShell';

export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <Journey />
      <PriceLadder />
      <Lot />
      <ReviewsWall />
      <FaqTeaser />
    </PageShell>
  );
}
