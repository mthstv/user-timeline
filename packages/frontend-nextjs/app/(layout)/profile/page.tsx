import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post } from '@/components/pages/feed/post';
import Image from 'next/image';

export default function Profile() {
  const userProfile = {
    name: 'John Doe',
    username: 'johndoe123',
    bio: 'web developer focused on typescript and next framework',
    avatar: null,
  };

  return (
    <main className="h-full w-full flex flex-col gap-4">
      <header className="flex gap-2 items-center">
        <Button variant="link" size="icon">
          <MoveLeft size={18} />
        </Button>
        <h1 className="text-2xl">Your Profile</h1>
      </header>
      <section className="flex flex-col gap-4">
        <div className="flex gap-4 items-end">
          <div className="h-28 w-28 rounded-full border border-muted-foreground flex items-center justify-center bg-slate-900 z-10">
            {userProfile.avatar ? (
              <Image
                alt="user profile image"
                className="rounded-full z-0"
                src={userProfile.avatar}
                width={112}
                height={112}
              />
            ) : (
              <p className="text-3xl text-white">JD</p>
            )}
          </div>
          <Button className="ml-auto" variant="outline">
            Edit profile
          </Button>
        </div>
        <div>
          <h2 className="text-xl">{userProfile.name}</h2>
          <span className="text-lg text-muted-foreground">
            @{userProfile.username}
          </span>
          <p className="my-2">{userProfile.bio}</p>
        </div>
      </section>
      <section>
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
      </section>
    </main>
  );
}
