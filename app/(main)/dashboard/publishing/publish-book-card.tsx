import Image from 'next/image';
import { Book, Edit, BarChart, SquarePen, ListChecks, CircleCheck, BookOpenCheck, FileWarning } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface PublishedBookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    image: string;
    publishDate: string;
    page_count: number;
    salesCount: number;
    status: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return (
        <div className="flex gap-x-3 items-center text-gray-600">
          <SquarePen size={16} />
          <p className="">Draft</p>
        </div>
      );
    case 'submitted':
      return (
        <div className="flex gap-x-3 items-center text-purple-600">
          <ListChecks size={16} />
          <p className="">Submitted</p>
        </div>
      );
    case 'approved':
      return (
        <div className="flex gap-x-3 items-center text-blue-600">
          <CircleCheck size={16} />
          <p className="">Approved</p>
        </div>
      );
    case 'published':
      return (
        <div className="flex gap-x-3 items-center text-green-600">
          <BookOpenCheck size={16} />
          <p className="">Published</p>
        </div>
      );
    case 'rejected':
      return (
        <div className="flex gap-x-3 items-center text-red-600">
          <FileWarning size={16} />
          <p className="">Rejected</p>
        </div>
      );
    default:
      return null;
  }
};

export function PublishedBookCard({ book }: PublishedBookCardProps) {
  const { push } = useRouter();
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex p-4">
        <div className="relative w-24 h-36 flex-shrink-0 overflow-hidden rounded-md">
          <Image src={book.image || '/placeholder.svg'} alt={`Cover of ${book.title}`} layout="fill" objectFit="cover" />
        </div>
        <div className="ml-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          {book?.status === 'published' ? (
            <>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Book className="w-4 h-4 mr-1" />
                <span>{book.page_count} pages</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Published: {new Date(book.publishDate).toLocaleDateString()}</p>
              <div className="flex items-center text-sm text-green-600">
                <BarChart className="w-4 h-4 mr-1" />
                <span>{book.salesCount} sales</span>
              </div>
            </>
          ) : (
            <div className="">{getStatusColor(book.status)}</div>
          )}
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-end">
          <Button onClick={() => push(`/dashboard/publishing/${book.id}`)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {/* <Button variant="default" size="sm">
            View Analytics
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
