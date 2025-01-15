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
