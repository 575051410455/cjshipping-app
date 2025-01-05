import PageContainer from '@/components/layout/page-container';
import { currentSessionUser } from '@/lib/auth/auth-utils';
import { SettingsForm } from './SettingForm';

export default async function ProfileViewPage() {
  const user = await currentSessionUser();

  return (
    <PageContainer>
      <div className="space-y-4">
        {user && <SettingsForm user={user} />}
      </div>
    </PageContainer>
  );
}
