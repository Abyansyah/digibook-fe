export interface Program {
  id: string;
  title: string;
  imageUrl: string;
  schedule: {
    startDate: string;
    endDate: string;
  };
  status: 'active' | 'completed' | 'ongoing';
  category: string;
}

type EventMode = 'offline' | 'online' | 'hybrid';
export interface EventType {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  event_mode: EventMode[];
  location: string | null;
  image: string;
  created_at: string;
  updated_at: string;
}
