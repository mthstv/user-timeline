'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="block text-sm text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
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
        </CardContent>
      </Card>
    </div>
  );
}
