import { cn } from '@/lib/utils';
import { Avatar as AvatarRoot, AvatarFallback, AvatarImage } from './primitive';

type AvatarProps = {
  user?: SessionUser;
  size?: number;
};

export const Avatar = ({ user, size = 9 }: AvatarProps) => {
  const initials = (user?.displayName ?? user?.name)
    ?.split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('');

  return (
    <AvatarRoot className={cn(`w-${size} h-${size}`, 'block')}>
      <AvatarImage src={user?.avatar ?? ''} />
      <AvatarFallback>{initials}</AvatarFallback>
    </AvatarRoot>
  );
};
