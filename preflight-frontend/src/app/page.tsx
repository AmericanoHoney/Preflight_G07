import { GET } from '@/lib/api';

export default async function Home() {
  const highlightResponse = await GET('/todo/owner');

  return <div>{JSON.stringify(highlightResponse)}</div>;
}
