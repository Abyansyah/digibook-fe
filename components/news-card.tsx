import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

export function NewsCard({ title, excerpt, category, date, imageUrl }: NewsCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground mt-auto">{date}</CardFooter>
    </Card>
  );
}
