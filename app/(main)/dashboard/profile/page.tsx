'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { fetchUser, updateUser } from '@/services/userApi';
import { UserForm } from '@/types/user';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const [formData, setFormData] = useState<UserForm>({
    name: '',
    nomor_whatsapp: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    biografi: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const { fetchUser: fetchMe } = useAuthStore();

  const { data: userResponse, error, isLoading } = useSWR('user', fetchUser);

  useEffect(() => {
    if (userResponse?.data) {
      const userData = userResponse.data;
      setFormData({
        name: userData.name || '',
        nomor_whatsapp: userData.nomor_whatsapp || '',
        tanggal_lahir: userData.tanggal_lahir || '',
        jenis_kelamin: userData.jenis_kelamin || '',
        biografi: userData.biografi || '',
      });
    }
  }, [userResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      jenis_kelamin: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setLocalError(null);

    try {
      await updateUser(formData);
      toast.success('Profile updated successfully!');
      await fetchMe();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile. Please try again.');
      setLocalError('Failed to update profile. Please try again.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Failed to load user data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

      {localError && <p className="text-red-500 mb-4">{localError}</p>}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="nomor_whatsapp">WhatsApp Number</Label>
            <Input id="nomor_whatsapp" name="nomor_whatsapp" value={formData.nomor_whatsapp} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="tanggal_lahir">Date of Birth</Label>
            <Input id="tanggal_lahir" name="tanggal_lahir" type="date" value={formData.tanggal_lahir} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="jenis_kelamin">Gender</Label>
            <RadioGroup value={formData.jenis_kelamin} onValueChange={handleGenderChange} className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MALE" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FEMALE" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="biografi" value={formData.biografi} onChange={handleChange} rows={4} />
          </div>
          <Button type="submit" className="w-full" disabled={loadingSubmit}>
            {loadingSubmit ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}
