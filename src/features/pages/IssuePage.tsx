import React from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import { Heading, Markdown, Anchor, Text } from 'grommet'
import { AppNavParams } from '../AppNavParams'
import { GHRepoData } from '../../app-logic/GHRepoData'
import { PageBody } from '../../components/PageBody'
import { RepoMissing } from '../../components/RepoMissing'
import { useGHRepoData } from '../../hooks/useGHRepoData'
import { useOneGHIssue } from '../../hooks/useOneGHIssue'

export const IssuePage: React.VFC = () => {
  const { owner, repo } = useGHRepoData()
  if (owner && repo) {
    return <IssuePageOK owner={owner} repo={repo} />
  }
  return <RepoMissing />
}

export const IssuePageOK: React.VFC<GHRepoData> = () => {
  const { issueId } = useParams<AppNavParams['issue']>()
  const { issue } = useOneGHIssue(issueId)
  const { goBack } = useHistory()
  return (
    <PageBody>
      <Heading>
        Issue id: {issueId}
        <br />
        <Text>
          <Anchor onClick={goBack}>&larr; Go back</Anchor>
        </Text>
      </Heading>
      {issue?.body && <Markdown>{issue?.body}</Markdown>}
    </PageBody>
  )
}
