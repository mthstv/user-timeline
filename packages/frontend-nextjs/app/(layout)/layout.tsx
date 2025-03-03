'use client';

import { NavItems } from '@/components/pages/sidebar/nav-items';
import { UserDropdown } from '@/components/pages/sidebar/user-dropdown';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile } from '@/context/profile-context';
import { cn } from '@/lib/utils';
import { getUserSession } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { Menu } from 'lucide-react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { profile, loadProfile } = useProfile();

  const fetchSession = async () => {
    const authSession = await getUserSession();
    if (!authSession) redirect('/auth/login');
    setSession(authSession);
    loadProfile();
    return authSession;
  };

  const { isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  return (
    <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-[300px,1fr] relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 lg:hidden z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </Button>

      <aside
        className={cn(
          'w-[300px] h-full flex flex-col items-center border-r border-muted bg-background',
          'fixed lg:relative transition-transform duration-300 z-40',
          !sidebarOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="w-full p-8 border-b border-muted">
          <div className="max-w-[100px] mx-auto"></div>
        </div>
        <NavItems />
        <div className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
          {isLoading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            <UserDropdown user={profile} />
          )}

          <ThemeToggle />
        </div>
      </aside>

      <div
        className={cn(
          'fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300',
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="p-6 flex flex-col w-full h-full overflow-auto lg:pl-6 pl-[72px]">
        {children}
      </main>
    </div>
  );
}
