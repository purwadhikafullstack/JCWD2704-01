import { z } from 'zod';

const baseUrl = z.string().optional().parse(process.env.NEXT_PUBLIC_BASE_API_URL);
const imageUrl = {
  webp: (name?: string | null) => name ? `${baseUrl}/images/webp/${name}` : '/placeholder.jpg',
};

export { imageUrl };
