'use client';

import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useState } from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);


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

      <aside className={cn(
        "w-[300px] h-full flex flex-col items-center border-r border-muted bg-background",
        "fixed lg:relative transition-transform duration-300 z-40",
        !sidebarOpen && "-translate-x-full lg:translate-x-0"
      )}>
        <div className="w-full p-6 border-b border-muted">
          <div className="max-w-[100px] mx-auto"></div>
        </div>
        <div />
        <div className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
          <ThemeToggle />
        </div>
      </aside>

      <div 
        className={cn(
          "fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="p-6 flex flex-col w-full h-full overflow-auto lg:pl-6 pl-[72px]">
        {children}
      </main>
    </div>
  );
}
