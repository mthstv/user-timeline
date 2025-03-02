import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post } from '@/components/pages/feed/post';

export const ProfilePostsTabs = () => {
  return (
    <Tabs defaultValue="own-posts" className="w-full mb-4">
      <TabsList>
        <TabsTrigger value="own-posts">Your posts</TabsTrigger>
        <TabsTrigger value="liked-posts">Liked posts</TabsTrigger>
      </TabsList>
      <TabsContent value="own-posts">
        <div className="flex flex-col gap-4">
          <Post />
          <Post />
          <Post />
        </div>
      </TabsContent>
      <TabsContent value="liked-posts">
        <div className="flex flex-col gap-4">
          <Post />
        </div>
      </TabsContent>
    </Tabs>
  );
};
