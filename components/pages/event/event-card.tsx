import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { getStatusText } from '@/lib/utils';

interface ProgramCardProps {
  category: string;
  title: string;
  isFree?: boolean;
  start_date: string;
  end_date: string;
  registeredCount: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  imageUrl: string;
  participants: number;
  is_registration?: boolean;
  participants_count: number;
  slug: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProgramCard({ category, title, isFree = false, start_date, end_date, registeredCount, status, imageUrl, participants_count, is_registration, slug }: ProgramCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const { push } = useRouter();

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={imageUrl} alt={title} fill onLoad={() => console.log('Image loaded')} className="object-cover" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {category}
          </Badge>
          {isFree && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-green-600">
              Gratis
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {start_date}
            {''}- {end_date}
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(registeredCount / participants_count) * 100}%` }} />
          </div>
          <p className="text-sm text-gray-600">{registeredCount} Peserta telah terdaftar</p>
          <Badge variant="outline" className={`mt-2 ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => push(`/event/${slug}`)} className="w-full" variant={status === 'completed' ? 'outline' : 'default'}>
          {status === 'completed' ? 'Lihat Detail' : 'Daftar'}
        </Button>
      </CardFooter>
    </Card>
  );
}
