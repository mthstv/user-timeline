import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AtSign } from 'lucide-react';
import Image from 'next/image';

type EditProfileDialogProps = {
  user: Record<string, string | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditProfileDialog = ({
  user,
  open,
  setOpen,
}: EditProfileDialogProps) => {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Edit profile"
      description="Change your profile as you like!"
      content={
        <main className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 justify-start items-center">
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
                  value={user.avatar || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm text-muted-foreground"
                >
                  Name
                </label>
                <Input id="name" value={user.name || ''} />
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
                    value={user.username || ''}
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
            <Textarea id="bio" value={user.bio || ''} />
          </div>
          <Button onClick={() => setOpen(false)}>Salvar</Button>
        </main>
      }
    />
  );
};
