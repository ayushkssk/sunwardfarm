'use client'

import { useEffect } from 'react'
import { auth } from '@/lib/firebase'

export function FirebaseInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This is just to ensure Firebase is initialized
    const unsubscribe = auth.onAuthStateChanged(() => {});
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}

