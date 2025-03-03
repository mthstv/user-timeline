import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedList } from '../../feed/feed-list';

export const ProfilePostsTabs = () => {
  return (
    <Tabs defaultValue="own-posts" className="w-full mb-4">
      <TabsList>
        <TabsTrigger value="own-posts">Your posts</TabsTrigger>
        <TabsTrigger value="liked-posts">Liked posts</TabsTrigger>
      </TabsList>
      <TabsContent value="own-posts">
        <FeedList limitBy="own-posts" />
      </TabsContent>
      <TabsContent value="liked-posts">
        <FeedList limitBy="liked-posts" />
      </TabsContent>
    </Tabs>
  );
};
