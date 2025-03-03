'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar } from '../../ui/avatar';
import { useProfile } from '@/context/profile-context';

type ProfileTooltipProps = {
  profile: UserProfile;
  children: React.ReactNode;
};

export function ProfileTooltip({ profile, children }: ProfileTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-background border border-muted text-muted-foreground flex flex-col gap-4 m-2 max-w-[200px]">
          <div className="flex items-center gap-4">
            <Avatar user={profile} />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {profile.displayName}
              </span>
              <span>@{profile.username}</span>
            </div>
          </div>
          <p className="mb-2">{profile.bio}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
