'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { handleSignIn } from '@/services/auth';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: SigninDto) => {
    handleSignIn(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="block text-sm text-muted-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          {...register('email', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="block text-sm text-muted-foreground"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          required
          {...register('password', { required: true })}
        />
      </div>
      <Button type="submit" className="w-full my-4">
        Sign In
      </Button>
      <Link href="/auth/signup">
        <Button
          type="button"
          className="w-full text-sm flex items-center justify-center text-center"
          variant="link"
        >
          {"Don't have an account? Sign up here"}
        </Button>
      </Link>
    </form>
  );
};
