'use client';

import { ThemeProvider } from './theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { useTanstackQuery } from '@/lib/tanstack-query';
import { SessionProvider } from 'next-auth/react';

type ClientProvidersProps = {
  children: React.ReactNode;
};

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  const queryClient = useTanstackQuery();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
