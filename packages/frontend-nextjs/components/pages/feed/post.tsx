'use client';

import { ProfileTooltip } from '@/components/pages/feed/profile-tooltip';
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { likePost } from '@/services/posts';
import { useMutation } from '@tanstack/react-query';

type PostProps = {
  post: UserPost;
};

export const Post = ({ post }: PostProps) => {
  const [like, setLike] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount || 0);

  const { mutateAsync: handleLikePost } = useMutation({
    mutationFn: likePost,
  });

  const toggleUserLike = async () => {
    setLike(!like);
    setLikesCount((prev) => (like ? prev - 1 : prev + 1));

    await handleLikePost({ id: post.id });
  };

  return (
    <Card className="transition-all">
      <CardHeader>
        {post.user ? (
          <div className="flex flex-row items-center gap-2">
            <ProfileTooltip>
              <span className="cursor-pointer">
                <Avatar user={post.user} />
              </span>
            </ProfileTooltip>

            <ProfileTooltip>
              <div className="size-fit">
                <CardTitle className="size-fit">
                  {post.user?.displayName}
                </CardTitle>
                <CardDescription className="size-fit">
                  {`@${post.user.username}`}
                </CardDescription>
              </div>
            </ProfileTooltip>
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-2 w-28" />
                <Skeleton className="h-2 w-20" />
              </div>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        {post.content ? (
          <p>{post.content}</p>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-end">
        {post.createdAt ? (
          <p className="text-xs text-muted-foreground">
            {format(new Date(post.createdAt), 'MM/dd/yyyy hh:mm a')}
          </p>
        ) : (
          <Skeleton className="h-4 w-20" />
        )}
        <div className="h-6 ml-auto cursor-pointer flex items-center gap-2">
          <span className={like ? 'text-red-600' : 'text-muted-foreground'}>
            {likesCount > 0 ? likesCount : ''}
          </span>
          <Heart
            className={cn(
              'transition-all',
              like ? 'fill-red-600' : 'fill-background',
              like ? 'text-red-600' : 'text-muted-foreground'
            )}
            onClick={toggleUserLike}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
