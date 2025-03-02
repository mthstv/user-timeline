import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { ProfileData } from '@/components/pages/profile/sections/profile-data';
import { ProfilePostsTabs } from '@/components/pages/profile/sections/profile-posts-tabs';

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
        <Link href="/feed">
          <Button variant="link" size="icon">
            <MoveLeft size={18} />
          </Button>
        </Link>
        <h1 className="text-2xl">Your Profile</h1>
      </header>
      <ProfileData user={userProfile} />
      <ProfilePostsTabs />
    </main>
  );
}
