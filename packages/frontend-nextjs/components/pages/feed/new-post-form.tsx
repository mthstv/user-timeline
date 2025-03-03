'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/context/profile-context';
import { createPost } from '@/services/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const NewPostForm = () => {
  const { profile } = useProfile();
  const { register, handleSubmit, setValue } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync: handleAddPost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['all-posts'] });
    },
  });

  const onSubmit = async (data: UserPost) => {
    await handleAddPost(data);
    setValue('content', '');
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Avatar user={profile} />
      <Textarea placeholder="What's on your mind?" {...register('content')} />
      <Button className="mt-auto" type="submit" disabled={isPending}>
        Post
      </Button>
    </form>
  );
};
