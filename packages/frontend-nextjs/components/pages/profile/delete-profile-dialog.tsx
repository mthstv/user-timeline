import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { removeAuthUser } from '@/services/auth';
import { removeAuthPosts } from '@/services/posts';
import { removeAuthProfile } from '@/services/profile';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

type DeleteProfileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteProfileDialog = ({
  open,
  setOpen,
}: DeleteProfileDialogProps) => {
  const deleteEntities = async () => {
    try {
      await removeAuthPosts();
      await removeAuthProfile();
      await removeAuthUser();
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: deleteEntities,
  });

  const handleDeleteProfile = async () => {
    await handleDelete();
    setOpen(false);
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Delete profile"
      description="Are you sure you want to delete your profile?"
      content={
        <Button variant="destructive" onClick={handleDeleteProfile}>
          Delete permanently
        </Button>
      }
    />
  );
};
