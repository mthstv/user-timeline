'use client';

import { Post } from '@/components/pages/feed/post';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getAuthPosts, getLikedPosts } from '@/services/posts';

type FeedListProps = {
  limitBy?: 'own-posts' | 'liked-posts';
};

export const FeedList = ({ limitBy }: FeedListProps) => {
  const [posts, setPosts] = useState<UserPost[]>([]);

  const fetchPosts = async () => {
    if (limitBy === 'own-posts') {
      const ownPosts = await getAuthPosts();
      setPosts(ownPosts);
      return ownPosts;
    }

    if (limitBy === 'liked-posts') {
      const likedPosts = await getLikedPosts();
      setPosts(likedPosts);
      return likedPosts;
    }

    const allPosts = await getAllPosts();
    setPosts(allPosts);
    return allPosts;
  };

  const { isLoading } = useQuery({
    queryKey: [`${limitBy ?? 'all-posts'}`],
    queryFn: fetchPosts,
  });

  return (
    <div className="flex flex-col gap-4 mb-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
