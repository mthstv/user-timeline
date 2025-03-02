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
        <div className="ml-auto cursor-pointer flex items-center gap-2">
          <span className={!like ? 'text-gray-300' : 'text-red-600'}>
            {like ? 2 : 1}
          </span>
          <Heart
            color={like ? 'red' : 'gray'}
            fill={like ? 'red' : undefined}
            onClick={() => setLike(!like)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
