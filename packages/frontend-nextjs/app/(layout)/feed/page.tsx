import { Post } from '@/components/pages/feed/post';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function Feed() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl">Your Feed</h1>
      <div className="flex gap-4">
        <Avatar user={{ name: 'John Doe' }} />
        <Textarea placeholder="What's on your mind?" />
      </div>
      <div className="flex flex-col gap-4">
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
