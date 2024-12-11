import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CardCompact } from '@/components/card-compact';
import { Heading } from '@/components/heading';
import { Placeholder } from '@/components/placeholder';
import { Spinner } from '@/components/spinner';
import { getAuth } from '@/features/auth/queries/get-auth';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { TicketUpsertForm } from '@/features/tickets/components/ticket-upsert-form';

const TicketsPage = async () => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="My Tickets"
        description="All your tickets at one place"
      />
      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
      />
      <ErrorBoundary
        fallback={<Placeholder label="Something went wrong!" />}
      >
        <Suspense fallback={<Spinner />}>
          <TicketList userId={user?.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
