import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage
} from './primitive';

type AvatarProps = {
  user: {
    name: string,
    image?: string,
  };
};

export const Avatar = ({ user }: AvatarProps) => {
  const initials = user.name
    ?.split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('');

  return (
    <AvatarRoot className="w-7 h-7 block">
      <AvatarImage src={user?.image ?? ''} />
      <AvatarFallback>{initials}</AvatarFallback>
    </AvatarRoot>
  );
};
