import { getProfile } from '@/services/profile';
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

type ProfileContextType = {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  loadProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function loadProfile() {
    try {
      const profile = await getProfile();
      setProfile(profile);
    } catch (error) {
      toast.error('Failed to load user profile.');
      setProfile(null);
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loadProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
