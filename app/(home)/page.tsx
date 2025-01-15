import EventSection from './event';
import FeatureSection from './feature';
import HeroSection from './hero';
import LeaderboardSection from './leaderboard';
import NewsSection from './news';
import PedomanPenerbitan from './pedoman-penerbitan';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeatureSection />
      <LeaderboardSection />
      <NewsSection />
      <EventSection />
      <PedomanPenerbitan />
    </main>
  );
}
