import { toast } from 'sonner';
import { useActionFeedback } from '../hooks/use-action-feedback';
import { ActionState } from '../utils/to-action-state';

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ state }) => {
      if (state.message) {
        toast.success(state.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ state }) => {
      if (state.message) {
        toast.error(state.message);
      }
      onError?.(actionState);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
};

export { Form };