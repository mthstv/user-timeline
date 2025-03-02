'use client';

import { ProfileTooltip } from '@/components/shared/profile-tooltip';
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export const Post = () => {
  const [like, setLike] = useState(false);
  const post = {
    content: 'Testing...',
    user: {
      name: 'John Doe',
      username: 'johndoe123',
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <ProfileTooltip>
          <span className="cursor-pointer">
            <Avatar user={post.user} />
          </span>
        </ProfileTooltip>

        <ProfileTooltip>
          <div className="size-fit">
            <CardTitle className="size-fit">{post.user.name}</CardTitle>
            <CardDescription className="size-fit">
              {`@${post.user.username}`}
            </CardDescription>
          </div>
        </ProfileTooltip>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center">
        <div className="ml-auto cursor-pointer flex items-center gap-2">
          <span className={!like ? 'text-muted-foreground' : 'text-red-600'}>
            {like ? 2 : 1}
          </span>
          <Heart
            className={like ? 'fill-red-600 text-red-600' : 'fill-background'}
            onClick={() => setLike(!like)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
