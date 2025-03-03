import { cn } from '@/lib/utils';
import { Avatar as AvatarRoot, AvatarFallback, AvatarImage } from './primitive';

type AvatarProps = {
  user: UserProfile | null;
  size?: number;
};

export const Avatar = ({ user, size = 9 }: AvatarProps) => {
  return (
    <AvatarRoot className={cn(`w-${size} h-${size}`, 'block')}>
      <AvatarImage src={user?.avatar ?? ''} />
      <AvatarFallback>{user?.initials}</AvatarFallback>
    </AvatarRoot>
  );
};
