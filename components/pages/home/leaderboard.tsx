import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { participants } from '@/constant/participant';
import { Participant } from '@/types/menu';

const LeaderboardSection: React.FC = () => {
  const topThree = participants.slice(0, 3);
  const others = participants.slice(3);
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Leaderboard</h2>
          <p className="text-gray-500">Ayo raih poin sebanyak-banyaknya dalam setiap event untuk mencapai posisi teratas dan bagikan kehebatanmu!</p>
        </div>

        <div className="flex flex-wrap justify-center items-end gap-4 mb-12">
          <div className="order-2 sm:order-1 text-center">
            <div className="relative inline-block hover:scale-110 transition-all duration-300">
              <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <Avatar className="w-20 h-20 border-4 border-purple-200">
                <AvatarImage src={topThree[0].image} alt={topThree[0].name} />
                <AvatarFallback>{topThree[0].name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-semibold mt-2">{topThree[0].name}</h3>
            <p className="text-sm text-orange-500 font-medium">{topThree[0].points} pts</p>
          </div>

          <div className="order-1 sm:order-2 text-center -mt-4">
            <div className="relative inline-block hover:scale-110 transition-all duration-300 ">
              {/* <div className="relative"><p className="absolute top-4 text-bold right-0 left-0">1</p></div> */}
              <Crown className="w-14 h-14 text-yellow-500 mx-auto mb-2" />
              <Avatar className="w-24 h-24 border-4 border-yellow-200">
                <AvatarImage src={topThree[1].image} alt={topThree[1].name} />
                <AvatarFallback>{topThree[1].name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-semibold mt-2">{topThree[1].name}</h3>
            <p className="text-sm text-orange-500 font-medium">{topThree[1].points} pts</p>
          </div>

          <div className="order-3 text-center">
            <div className="relative inline-block hover:scale-110 transition-all duration-300">
              <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <Avatar className="w-20 h-20 border-4 border-purple-200">
                <AvatarImage src={topThree[2].image} alt={topThree[2].name} />
                <AvatarFallback>{topThree[2].name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-semibold mt-2">{topThree[2].name}</h3>
            <p className="text-sm text-orange-500 font-medium">{topThree[2].points} pts</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {others.map((participant: Participant, index: number) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <p>{index + 4}</p>
                <Crown className="w-6 h-6 text-purple-500" />
                <Avatar className="w-12 h-12">
                  <AvatarImage src={participant.image} alt={participant.name} className="object-center" />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{participant.name}</h3>
                </div>
              </div>
              <p className="text-sm text-orange-500 font-medium"> {participant.points} pts</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Ikuti Event Sekarang Juga!</Button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
