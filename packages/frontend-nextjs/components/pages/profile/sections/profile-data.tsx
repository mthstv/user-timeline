'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { EditProfileDialog } from '../edit-profile-dialog';

type ProfileDataProps = {
  user: Record<string, string | null>;
};

export const ProfileData = ({ user }: ProfileDataProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4 items-end">
        <div className="h-28 w-28 rounded-full border border-muted-foreground flex items-center justify-center bg-secondary z-10">
          {user.avatar ? (
            <Image
              alt="user profile image"
              className="rounded-full z-0"
              src={user.avatar}
              width={112}
              height={112}
            />
          ) : (
            <p className="text-3xl text-muted-foreground">JD</p>
          )}
        </div>
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => setShowEditModal(true)}
        >
          Edit profile
        </Button>
        <EditProfileDialog open={showEditModal} setOpen={setShowEditModal} />
      </div>
      <div>
        <h2 className="text-xl">{user.name}</h2>
        <span className="text-lg text-muted-foreground">@{user.username}</span>
        <p className="my-2">{user.bio}</p>
      </div>
    </main>
  );
};
