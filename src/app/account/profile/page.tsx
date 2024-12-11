import { Heading } from '@/components/heading';
import { AccountTabs } from '@/features/account/components/account-tabs';
import { UsernameForm } from '@/features/account/components/username-form';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

const ProfilePage = async () => {
  const { user } = await getAuthOrRedirect();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTabs />}
      />
      <UsernameForm user={user} />
    </div>
  );
};

export default ProfilePage;
