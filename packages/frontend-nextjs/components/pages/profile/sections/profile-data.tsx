'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { EditProfileDialog } from '../edit-profile-dialog';
import { DeleteProfileDialog } from '../delete-profile-dialog';
import { useProfile } from '@/context/profile-context';

export const ProfileData = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { profile } = useProfile();

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4 items-end">
        <div className="h-28 w-28 rounded-full border border-muted-foreground flex items-center justify-center bg-secondary z-10">
          {profile?.avatar ? (
            <Image
              alt="user profile image"
              className="rounded-full z-0"
              src={profile?.avatar}
              width={112}
              height={112}
            />
          ) : (
            <span className="text-3xl text-muted-foreground">
              {profile?.initials}
            </span>
          )}
        </div>
        <div className="ml-auto"></div>
        <Button variant="outline" onClick={() => setShowEditModal(true)}>
          Edit profile
        </Button>
        <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
          Delete profile
        </Button>
      </div>
      <div>
        <h2 className="text-xl">{profile?.displayName}</h2>
        <span className="text-lg text-muted-foreground">
          @{profile?.username}
        </span>
        <p className="my-2">{profile?.bio}</p>
      </div>

      {profile && (
        <EditProfileDialog
          profile={profile}
          open={showEditModal}
          setOpen={setShowEditModal}
        />
      )}

      <DeleteProfileDialog
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
      />
    </main>
  );
};
