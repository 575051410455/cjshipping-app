'use client';

import { useRouter } from 'next/navigation';


import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { ReactNode } from 'react';
import SignInViewPage from '@/app/(auth)/login/_components/signin-view';

interface LoginButtonProps {
  children: ReactNode;
  asChild?: boolean;
}

export const LoginButton = ({ children, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/login');
  };


  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
};
