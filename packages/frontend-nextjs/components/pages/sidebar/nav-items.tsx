'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Newspaper, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();
  const navItems = [
    {
      label: 'Feed',
      icon: Home,
      path: '/feed',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];
  return (
    <nav className="w-full flex flex-col gap-2 px-2 py-4">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.path);

        return (
          <Link href={item.path} key={item.path}>
            <Button
              variant="ghost"
              className={cn(
                'w-full gap-2 justify-start',
                isActive && 'bg-accent',
                'lg:px-4 px-2'
              )}
            >
              <item.icon size={16} />
              <span className="lg:inline">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
