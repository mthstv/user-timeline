'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AtSign } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
          {...register('email', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="username"
          className="block text-sm text-muted-foreground"
        >
          Username
        </label>
        <div className="flex items-center">
          <span className="bg-secondary border border-secondary rounded p-[5px] rounded-r-none">
            <AtSign />
          </span>
          <Input
            className="rounded-l-none"
            placeholder="johndoe123"
            id="username"
            required
            {...register('username', { required: true })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="displayName"
          className="block text-sm text-muted-foreground"
        >
          Display name
        </label>
        <Input
          id="displayName"
          placeholder="John Doe"
          {...register('displayName', { required: true })}
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
          {...register('password', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="passwordConfirmation"
          className="block text-sm text-muted-foreground"
        >
          Password Confirmation
        </label>
        <Input
          id="passwordConfirmation"
          type="password"
          placeholder="********"
          {...register('passwordConfirmation', {
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
          })}
        />
        {errors.passwordConfirmation && (
          <span className="text-destructive">Passwords do not match</span>
        )}
      </div>
      <Button type="submit" className="w-full my-4">
        Register
      </Button>
      <Link href="/auth/login">
        <Button
          type="button"
          className="w-full text-sm flex items-center justify-center text-center"
          variant="link"
        >
          Already have an account? Login here
        </Button>
      </Link>
    </form>
  );
};
