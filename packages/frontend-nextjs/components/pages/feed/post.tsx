'use client';

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
        <Avatar user={post.user} />
        <div className="size-fit">
          <CardTitle className="size-fit">{post.user.name}</CardTitle>
          <CardDescription className="size-fit">
            {`@${post.user.username}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center">
        <Heart
          className="ml-auto cursor-pointer"
          color="red"
          fill={like ? 'red' : undefined}
          onClick={() => setLike(!like)}
        />
      </CardFooter>
    </Card>
  );
};
