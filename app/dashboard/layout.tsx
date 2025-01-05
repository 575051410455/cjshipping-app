import { auth } from '@/auth';
import KBar from '@/components/kbar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'CJ Shipping Dashboard Starter',
  description: 'Basic dashboard with App and Shpping'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const session = await auth()
  return (
    <KBar>
      <SessionProvider session={session} >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar/>
          <SidebarInset>
            <Header />
            {/* page main content */}
            {children}
            {/* page main content ends */}
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    </KBar>
  );
}
