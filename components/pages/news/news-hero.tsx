import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { stripHtmlTags } from '@/lib/utils';

export interface NewsHeroProps {
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
  slug: string;
}

export function NewsHero({ title, description, image, category, created_at, slug }: NewsHeroProps) {
  return (
    <Link href={`/news/${slug}`}>
      <div className="relative group overflow-hidden rounded-xl">
        <div className="aspect-[21/9] relative">
          <Image src={image || '/placeholder.svg'} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 p-6 space-y-2">
          <Badge className="bg-primary text-primary-foreground">{category}</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <p className="text-white/90 line-clamp-2 max-w-2xl">{stripHtmlTags(description)}</p>
          <div className="flex items-center gap-2 text-white/75 text-sm">
            <time>{created_at}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}
