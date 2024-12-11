'use client'
import { User } from '@prisma/client'
import { useActionState } from 'react'
import { FieldError } from '@/components/form/componets/field-error'
import { Form } from '@/components/form/componets/form'
import { SubmitButton } from '@/components/form/componets/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUsername } from '../actions/update-username'

type UsernameFormProps = {
  user: User
}

const UsernameForm = ({ user }: UsernameFormProps) => {
  const [state, action] = useActionState(updateUsername, EMPTY_ACTION_STATE)

  return (
    <Form action={action} actionState={state}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        defaultValue={
          (state.payload?.get('username') as string) ?? user.username
        }
      />
      <FieldError errors={state.errors} name="username" />

      <SubmitButton label="Update" />
    </Form>
  )
}

export { UsernameForm }
