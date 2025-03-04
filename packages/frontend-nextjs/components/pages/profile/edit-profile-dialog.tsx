import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile } from '@/services/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AtSign } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type EditProfileDialogProps = {
  profile: UserProfile | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditProfileDialog = ({
  profile,
  open,
  setOpen,
}: EditProfileDialogProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      avatar: profile?.avatar,
      displayName: profile?.displayName,
      username: profile?.username,
      bio: profile?.bio,
    },
  });

  const { mutateAsync: handleUpdateProfile, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      toast.success('Profile updated successfully.');
    },
    onError() {
      toast.error('An error occoured while trying to edit your profile.');
    },
  });

  const onSubmit = async (data: UserProfile) => {
    await handleUpdateProfile(data);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Edit profile"
      description="Change your profile as you like!"
      content={
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 justify-start items-center">
              <div className="h-28 w-28 rounded-full border border-muted-foreground flex items-center justify-center bg-secondary z-10">
                {profile?.avatar ? (
                  <Image
                    alt="user profile image"
                    className="rounded-full z-0"
                    src={profile.avatar}
                    width={112}
                    height={112}
                  />
                ) : (
                  <span className="text-3xl text-muted-foreground">
                    {profile?.initials}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="avatar"
                  className="block text-sm text-muted-foreground"
                >
                  Avatar
                </label>
                <Input
                  placeholder="https://..."
                  id="avatar"
                  {...register('avatar')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm text-muted-foreground"
                >
                  Name
                </label>
                <Input id="name" {...register('displayName')} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="block text-sm text-muted-foreground"
                >
                  Username
                </label>
                <div className="flex items-center">
                  <span className="bg-secondary border border-secondary rounded p-[5px] rounded-r-none">
                    <AtSign />
                  </span>
                  <Input
                    className="rounded-l-none"
                    id="username"
                    {...register('username')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="bio"
              className="block text-sm text-muted-foreground"
            >
              Bio
            </label>
            <Textarea id="bio" {...register('bio')} />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      }
    />
  );
};
