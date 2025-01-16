import Hero from './hero';
import Timeline from './timeline';
import TrendingBooks from './trending-books';
import TopAuthors from './top-authors';
import Testimonials from './testimonial';
import CTA from './cta';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Timeline />
      <TrendingBooks />
      <TopAuthors />
      <Testimonials />
      <CTA />
    </main>
  );
}
