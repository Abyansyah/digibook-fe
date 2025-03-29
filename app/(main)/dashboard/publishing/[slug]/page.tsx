'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { postPublish, fetchPublish, updatePublish } from '@/services/publishApi';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Combobox from '@/components/ui/combobox';
import { getCategories } from '@/services/bookApi';
import { EventCategory } from '@/store/eventStore';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { alertMessages, AlertRibbon, AlertType } from '../alert-ribbon';

export default function PublicationPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const isCreateMode = params.slug === 'new';
  const slug = params.slug;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [bookPreview, setBookPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AlertType>('draft');
  const [showDialog, setShowDialog] = useState(false);
  const { data: categoriesData } = useSWR('book-category', getCategories);

  useEffect(() => {
    if (!isCreateMode && slug) {
      setLoading(true);
      fetchPublish(slug)
        .then((res) => {
          const data = res.data;
          setTitle(data.title || '');
          setAuthor(data.author || '');
          setDescription(data.description || '');
          if (data.categories && data.categories.length > 0) {
            setCategory(data.categories[0].name);
          }
          setCoverPreview(data.image);
          setBookPreview(data.book_file);
          setStatus(data.publication?.status || 'draft');
        })
        .catch((error) => console.error('Error fetching publication data:', error))
        .finally(() => setLoading(false));
    }
  }, [isCreateMode, slug]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'book') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'cover') {
      setCover(file);
      setCoverPreview(URL.createObjectURL(file));
    } else if (type === 'book') {
      if (file.type !== 'application/pdf') {
        toast.error('File buku harus dalam format PDF!');
        return;
      }
      setBookFile(file);
      setBookPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      toast.warning('Title dan Author harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const selectedCategory: EventCategory | undefined = categoriesData?.data?.find((cat: EventCategory) => cat.name === category);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('description', description || '');
      if (selectedCategory) {
        formData.append('category_id[]', selectedCategory.id.toString());
      }
      if (cover) formData.append('image', cover);
      if (bookFile) formData.append('book_file', bookFile);

      if (isCreateMode) {
        const result = await postPublish(formData);
        const newSlug = result.data.id;
        toast.success('Buku berhasil dibuat!');
        router.push(`/dashboard/publishing/${newSlug}`);
      } else {
        await updatePublish(slug, formData);
        toast.success('Buku berhasil diperbarui!');
      }
    } catch (error) {
      toast.error('Gagal menyimpan data!');
      console.error('Error on submission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFinal = async () => {
    setShowDialog(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('is_submitted', '1');
      await updatePublish(slug, formData);
      toast.success('Buku telah disubmit dan tidak dapat diedit lagi!');
      setStatus('submitted');
    } catch (error) {
      toast.error('Gagal submit buku!');
      console.error('Error submitting book:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAllFilled = title && author && description && coverPreview && bookPreview;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{isCreateMode ? 'Start Publishing' : 'Edit Publication'}</h1>
      <Button variant="link" asChild className="text-muted-foreground hover:text-foreground mb-6">
        <Link href="/dashboard/publishing">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali ke Publishing
        </Link>
      </Button>
      {status !== 'draft' && <AlertRibbon className="mb-4" type={status} message={alertMessages[status]} />}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Judul Buku <span className="text-red-500">*</span>
            </Label>
            {loading ? <Skeleton className="h-10 w-full" /> : <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">
              Nama Penulis <span className="text-red-500">*</span>
            </Label>
            {loading ? <Skeleton className="h-10 w-full" /> : <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={loading} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori Buku</Label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Combobox
                options={
                  categoriesData?.data?.map((cat: EventCategory) => ({
                    value: cat.name,
                    label: cat.name,
                  })) || []
                }
                value={category}
                onChange={setCategory}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            {loading ? <Skeleton className="h-24 w-full" /> : <Textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Sampul Buku</Label>
            <Input id="cover" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} disabled={loading} />
            {coverPreview && <Image width={500} height={500} src={coverPreview} alt="Cover Preview" className="w-32 h-48 object-cover rounded mt-2" />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookFile">File Buku (PDF)</Label>
            <Input id="bookFile" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'book')} disabled={loading} />
            {bookPreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview PDF:</p>
                <iframe src={bookPreview} className="w-full h-screen border rounded mt-1"></iframe>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <Button type="submit" disabled={loading || !(status === 'draft' || status === 'rejected')}>
              Save
            </Button>
            {(status === 'draft' || status === 'rejected') && isAllFilled && (
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button type="button" variant="success">
                    Submit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Konfirmasi Submit</DialogTitle>
                    <DialogDescription>
                      Apakah Anda yakin ingin submit buku ini? <br />
                      <strong>Setelah disubmit, Anda tidak dapat mengedit lagi.</strong>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-4">
                    <Button onClick={() => setShowDialog(false)}>Batal</Button>
                    <Button variant="destructive" onClick={handleSubmitFinal}>
                      Ya, Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
