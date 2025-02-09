export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  foto: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserForm {
  name: string;
  nomor_whatsapp: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  biografi: string;
}
