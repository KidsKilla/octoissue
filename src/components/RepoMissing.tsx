import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Paragraph } from 'grommet'
import { PageBody } from './PageBody'

export const RepoMissing: React.VFC = () => (
  <PageBody>
    <Heading>Repo data is missing!</Heading>
    <Paragraph>
      <Link to="/">Go back</Link>
    </Paragraph>
  </PageBody>
)
