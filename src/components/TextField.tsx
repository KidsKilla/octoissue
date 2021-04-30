import React from 'react'
import { FormField, TextInput } from 'grommet'

export const TextField: React.VFC<{
  name: string
  label: string
  value: string
  onChange: (text: string) => void
}> = (props) => (
  <FormField
    name={props.name}
    htmlFor={`id-of-${props.name}`}
    label={props.name}
  >
    <TextInput
      id={`id-of-${props.name}`}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  </FormField>
)
