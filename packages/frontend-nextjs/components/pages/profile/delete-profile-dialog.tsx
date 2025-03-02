import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

type DeleteProfileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteProfileDialog = ({
  open,
  setOpen,
}: DeleteProfileDialogProps) => {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Delete profile"
      description="Are you sure you want to delete your profile?"
      content={
        <Button variant="destructive" onClick={() => setOpen(false)}>
          Delete permanently
        </Button>
      }
    />
  );
};
