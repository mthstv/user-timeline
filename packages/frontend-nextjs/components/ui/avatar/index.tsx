import { cn } from '@/lib/utils';
import { Avatar as AvatarRoot, AvatarFallback, AvatarImage } from './primitive';
import { Skeleton } from '../skeleton';

type AvatarProps = {
  user: UserProfile | null;
  size?: number;
};

export const Avatar = ({ user, size = 9 }: AvatarProps) => {
  return (
    <>
      {user ? (
        <AvatarRoot className={cn(`w-${size} h-${size}`, 'block')}>
          <AvatarImage src={user?.avatar || undefined} />
          <AvatarFallback>{user?.initials}</AvatarFallback>
        </AvatarRoot>
      ) : (
        <Skeleton className="h-8 w-9 rounded-full" />
      )}
    </>
  );
};
