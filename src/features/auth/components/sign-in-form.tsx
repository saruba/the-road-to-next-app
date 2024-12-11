'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/componets/field-error';
import { Form } from '@/components/form/componets/form';
import { SubmitButton } from '@/components/form/componets/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  const [state, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={state}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={state.payload?.get('email') as string}
      />
      <FieldError errors={state.errors} name="email" />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={state.payload?.get('password') as string}
      />
      <FieldError errors={state.errors} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
