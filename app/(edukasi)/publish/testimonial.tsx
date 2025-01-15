import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Sample from '@/public/images/sample-comment.jpg';

const testimonials = [
  {
    quote: 'Platform ini memudahkan saya menerbitkan buku pertama saya. Sungguh pengalaman yang luar biasa!',
    author: 'Rina Wijaya',
    role: 'Penulis Novel',
  },
  {
    quote: 'Distribusi global membuat buku saya terjual di negara-negara yang tidak pernah saya bayangkan sebelumnya.',
    author: 'Budi Santoso',
    role: 'Penulis Non-Fiksi',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Penulis Kami</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <Image src={Sample} alt={testimonial.author} width={50} height={50} className="rounded-full object-cover w-16 h-16 mr-4" />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
