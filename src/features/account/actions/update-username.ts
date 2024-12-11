'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { accountProfilePath } from '@/paths';

const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(191)
    .refine((value) => !value.includes(' '), 'Username cannot contain spaces'),
});

export const updateUsername = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = updateUsernameSchema.parse(Object.fromEntries(formData));

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(accountProfilePath());

  return toActionState('SUCCESS', 'Username updated');
};
