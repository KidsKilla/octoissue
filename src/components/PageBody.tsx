import React from 'react'
import { Main } from 'grommet'

export const PageBody: React.FC = (props) => (
  <Main margin={{ horizontal: '10%' }} overflow="visible" {...props} />
)
