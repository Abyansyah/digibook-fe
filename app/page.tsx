import EventSection from '../components/pages/home/event';
import FeatureSection from '../components/pages/home/feature';
import HeroSection from '../components/pages/home/hero';
import LeaderboardSection from '../components/pages/home/leaderboard';
import NewsSection from '../components/pages/home/news';
import PedomanPenerbitan from '../components/pages/home/pedoman-penerbitan';

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
