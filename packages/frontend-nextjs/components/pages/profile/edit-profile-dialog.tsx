import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

type EditProfileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditProfileDialog = ({
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
        <div className="flex flex-col gap-4">
          <Button>Salvar</Button>
        </div>
      }
    />
  );
};
