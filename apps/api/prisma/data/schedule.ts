import { StoreSchedule } from '@prisma/client';

export const schedule: StoreSchedule[] = [
  {
    id: 'cly5uxlq100020cl5giq7e62r',
    name: 'Operational',
    start_time: new Date(2024, 3, 7, 9, 0, 0),
    end_time: new Date(2024, 3, 7, 18, 0, 0),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'cly5uwfce00010cl59ze5fnh1',
    name: 'Setengah hari',
    start_time: new Date(2024, 3, 7, 9, 0, 0),
    end_time: new Date(2024, 3, 7, 15, 0, 0),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'cly5uv68000000cl5ggdf1crx',
    name: 'Libur nasional',
    start_time: null,
    end_time: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
