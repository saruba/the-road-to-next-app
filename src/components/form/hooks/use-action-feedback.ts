import { useEffect, useRef } from 'react'
import { ActionState } from '@/components/form/utils/to-action-state'

type OnArgs = {
  state: ActionState
}

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void
  onError?: (onArgs: OnArgs) => void
}

const useActionFeedback = (
  state: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(state.timestamp)
  const isUpdate = prevTimestamp.current !== state.timestamp

  useEffect(() => {
    if (!isUpdate) return
    if (state.status === 'SUCCESS') {
      options.onSuccess?.({ state })
    }

    if (state.status === 'ERROR') {
      options.onError?.({ state })
    }
    prevTimestamp.current = state.timestamp
  }, [isUpdate, state, options])
}

export { useActionFeedback }
