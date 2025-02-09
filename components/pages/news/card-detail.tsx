import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { NewsArticle } from '@/types/news';
import { stripHtmlTags } from '@/lib/utils';

export function NewsCard({ title, description, image, category, created_at, slug }: NewsArticle) {
  return (
    <Link href={`/news/${slug}`} className="group">
      <article className="space-y-4">
        <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
          <Image src={image || '/placeholder.svg'} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
          <Badge className="absolute top-4 left-4">{category}</Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground line-clamp-2">{stripHtmlTags(description)}</p>
          <time className="text-sm text-muted-foreground">{created_at}</time>
        </div>
      </article>
    </Link>
  );
}
