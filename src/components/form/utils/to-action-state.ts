import { ZodError } from "zod";

export type ErrorState = Record<string, string[] | undefined>;

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  errors: ErrorState;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  errors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    // if validation error with Zod, return first error message
    return {
      status: "ERROR",
      message: "",
      payload: formData,
      errors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    // if another error instance, return error message
    // e.g. database error
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      errors: {},
      timestamp: Date.now(),
    };
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      payload: formData,
      errors: {},
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState => {
  return {
    status,
    message,
    payload: formData,
    errors: {},
    timestamp: Date.now(),
  };
};
