import { axiosInstance, setHeader } from '@/lib/axios';

export default async function getBooks(token: string) {
  await setHeader(token);
  const res = await axiosInstance.get('/user_books');
  return res.data.user_books;
}