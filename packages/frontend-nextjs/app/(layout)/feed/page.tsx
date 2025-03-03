import { FeedList } from '@/components/pages/feed/feed-list';
import { NewPostForm } from '@/components/pages/feed/new-post-form';

export default function Feed() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl">Your Feed</h1>
      <NewPostForm />
      <FeedList />
    </main>
  );
}
