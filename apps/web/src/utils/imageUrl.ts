import { z } from 'zod';

const baseUrl = z.string().optional().parse(process.env.NEXT_PUBLIC_BASE_API_URL);
const imageUrl = {
  render: (name?: string | null, placeholder?: string) =>
    name ? `${baseUrl}/images/${name}` : placeholder ? placeholder : "/placeholder.jpg",
};

export { imageUrl };
