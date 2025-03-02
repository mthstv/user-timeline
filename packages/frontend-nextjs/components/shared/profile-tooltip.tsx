'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar } from '../ui/avatar';

type ProfileTooltipProps = {
  children: React.ReactNode;
};

export function ProfileTooltip({ children }: ProfileTooltipProps) {
  const userProfile = {
    name: 'John Doe',
    username: 'johndoe123',
    bio: 'web developer focused on typescript and next framework',
    avatar: null,
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-background border border-muted text-muted-foreground flex flex-col gap-4 m-2 max-w-[200px]">
          <div className="flex items-center gap-4">
            <Avatar user={userProfile} size="10" />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {userProfile.name}
              </span>
              <span>@{userProfile.username}</span>
            </div>
          </div>
          <p className="mb-2">{userProfile.bio}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
