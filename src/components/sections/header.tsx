'use client';
import { KanbanIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/features/auth/actions/sign-out';
import { useAuth } from '@/features/auth/hooks/use-auth';
import {
  homePath,
  signInPath,
  signUpPath,
  ticketsPath,
} from '@/paths';
import { SubmitButton } from '../form/submit-button';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { Button, buttonVariants } from '../ui/button';

const Header = () => {
  // const { user } = await getAuth();
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: 'outline' })}
      >
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LogOutIcon />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: 'outline' })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: 'default' })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav
      className="
            animate-header-from-top
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
    >
      <div className="flex align-items gap-x-2">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <KanbanIcon />
            <h1 className="text-lg font-semibold"> TicketBounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
