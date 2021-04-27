import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Paragraph, Heading } from 'grommet'
import { PageBody } from '../../components/PageBody'

export const NotFoundPage: React.VFC = () => {
  const routeMatch = useRouteMatch()
  return (
    <PageBody>
      <Heading>404 Not Found</Heading>
      <Paragraph>Issue id: {routeMatch.path}</Paragraph>
    </PageBody>
  )
}
