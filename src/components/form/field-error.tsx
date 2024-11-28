import { ActionState } from "@/components/form/utils/to-action-state";

type FieldErrorProps = {
  errors: ActionState["errors"];
  name: string;
};

const FieldError = ({ errors, name }: FieldErrorProps) => {
  const messages = errors[name];

  return messages?.map((message) => (
    <span key={message} className="text-xs text-red-500">
      {message}
    </span>
  ));
};

export { FieldError };
