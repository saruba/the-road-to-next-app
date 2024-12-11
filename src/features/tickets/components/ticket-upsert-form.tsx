'use client'
import { Ticket } from '@prisma/client'
import { useActionState, useRef } from 'react'
import {
  DatePicker,
  ImperativeHandleFromDatePicker,
} from '@/components/date-picker'
import { FieldError } from '@/components/form/componets/field-error'
import { Form } from '@/components/form/componets/form'
import { SubmitButton } from '@/components/form/componets/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fromCent } from '@/utils/currency'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertFormProps = {
  ticket?: Ticket
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [state, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  )
  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null)

  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset()
  }

  return (
    <Form action={action} actionState={state} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={(state.payload?.get('title') as string) ?? ticket?.title}
      />
      <FieldError errors={state.errors} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (state.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <FieldError errors={state.errors} name="content" />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (state.payload?.get('deadline') as string) ?? ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError errors={state.errors} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty (€)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (state.payload?.get('bounty') as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : '')
            }
          />
          <FieldError errors={state.errors} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </Form>
  )
}

export { TicketUpsertForm }
