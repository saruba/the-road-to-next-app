import { cloneElement, useActionState, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Form } from './form/componets/form';
import { SubmitButton } from './form/componets/submit-button';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from './form/utils/to-action-state';

type UseConfirmDialogArgs = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Make sure you understand the consequences.',
  action,
  trigger,
}: UseConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form
            action={formAction}
            actionState={actionState}
            onSuccess={handleSuccess}
          >
            <AlertDialogAction asChild>
              <SubmitButton label="Confirm" />
            </AlertDialogAction>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
