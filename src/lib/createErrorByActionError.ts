import { SerializedError } from '@reduxjs/toolkit'

export const createErrorByActionError = (err: SerializedError) => {
  const error = new Error(
    err.message ? `${err.name} (${err.code}): ${err.message}` : 'Bad request',
  )
  error.stack = err.stack
  error.name = err.name || 'FetchError'
  return error
}
