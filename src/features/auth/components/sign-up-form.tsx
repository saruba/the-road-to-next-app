"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={state}>
      <Input
        name="username"
        placeholder="Username"
        defaultValue={state.payload?.get("username") as string}
      />
      <FieldError errors={state.errors} name="username" />

      <Input
        name="email"
        placeholder="Email"
        defaultValue={state.payload?.get("email") as string}
      />
      <FieldError errors={state.errors} name="email" />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={state.payload?.get("password") as string}
      />
      <FieldError errors={state.errors} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={state.payload?.get("confirmPassword") as string}
      />
      <FieldError errors={state.errors} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
