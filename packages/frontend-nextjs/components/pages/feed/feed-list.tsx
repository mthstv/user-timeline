'use client';

import { Post } from '@/components/pages/feed/post';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getAuthPosts, getLikedPosts } from '@/services/posts';
import { getProfileByUser } from '@/services/profile';

type FeedListProps = {
  limitBy?: 'own-posts' | 'liked-posts';
};

export const FeedList = ({ limitBy }: FeedListProps) => {
  const [posts, setPosts] = useState<UserPost[]>([]);

  const fetchPosts = async () => {
    if (limitBy === 'own-posts') return await getAuthPosts();
    if (limitBy === 'liked-posts') return await getLikedPosts();
    return await getAllPosts();
  };

  const fetchPostsWithProfile = async () => {
    const fetchedPosts: UserPost[] = await fetchPosts();

    const userIdsFromPosts = [
      ...new Set(fetchedPosts.map((post) => post.createdBy)),
    ];

    const profiles = await Promise.all(
      userIdsFromPosts.map((userId) => getProfileByUser(userId))
    );

    const postsWithProfile = fetchedPosts.map((post) => {
      const profile = profiles.find(
        (profile: UserProfile) => profile.userId === post.createdBy
      );
      return { ...post, profile };
    });

    setPosts(postsWithProfile);
    return postsWithProfile;
  };

  const { isLoading } = useQuery({
    queryKey: [`${limitBy ?? 'all-posts'}`],
    queryFn: fetchPostsWithProfile,
  });

  return (
    <div className="flex flex-col gap-4 mb-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
