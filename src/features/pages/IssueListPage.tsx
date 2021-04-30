import React, { useEffect, useState } from 'react'
import {
  Heading,
  Box,
  Paragraph,
  Pagination,
  DataTable,
  Text,
  Spinner,
} from 'grommet'
import { Link } from 'react-router-dom'
import { PageBody } from '../../components/PageBody'
import { useGHRepoData } from '../../hooks/useGHRepoData'
import { useGHIssues } from '../../hooks/useGHIssues'
import { usePrevious } from '../../hooks/usePrevious'
import { useLoaderSmartVisibility } from '../../hooks/useLoaderSmartVisibility'
import { GHIssue } from '../../app-logic/store.issue'
import { RepoMissing } from '../../components/RepoMissing'
import { GHRepoData } from '../../app-logic/GHRepoData'
import { LoadingIndicator } from '../../components/LoadingIndicator'

export const IssueListPage: React.VFC = () => {
  const { owner, repo } = useGHRepoData()
  if (owner && repo) {
    return <IssueListPageOK owner={owner} repo={repo} />
  }
  return <RepoMissing />
}

const PAGE_SIZE = 3

export const IssueListPageOK: React.VFC<GHRepoData> = (props) => {
  const [currentPage, setPage] = useState(1)
  const { allIssues, request, fetchIssues } = useGHIssues()
  const openIssuesCount = useGHRepoData().data?.open_issues_count || 0
  const prevPage = usePrevious(currentPage)
  useEffect(() => {
    if (currentPage === prevPage) {
      return
    }
    fetchIssues({
      owner: props.owner,
      repo: props.repo,
      currentPage,
      pageSize: PAGE_SIZE,
    })
  }, [currentPage, prevPage, fetchIssues, props.owner, props.repo])

  return (
    <PageBody>
      <Heading>
        Issues of {props.owner}/{props.repo}
      </Heading>
      {request.error && (
        <Paragraph>
          Request error: {request.error.name}: {request.error.message}
        </Paragraph>
      )}
      <LoadingIndicator
        visible={useLoaderSmartVisibility(request.status === 'pending')}
      />
      {request.status === 'pending' && allIssues.length === 0 && (
        <Spinner size="xlarge" />
      )}
      {request.status === 'fulfilled' && allIssues.length === 0 && (
        <Paragraph>
          No issues in {props.owner}/{props.repo}!
        </Paragraph>
      )}
      {allIssues.length > 0 ? (
        <IssuesTable
          Pagination={() => (
            <Pagination
              numberItems={openIssuesCount}
              step={PAGE_SIZE}
              page={currentPage}
              onChange={(evt) => setPage(evt.page)}
            />
          )}
          issues={allIssues}
        />
      ) : undefined}
    </PageBody>
  )
}

const IssuesTable: React.VFC<{
  issues: GHIssue[]
  Pagination: React.VFC
}> = (props) => (
  <Box pad="large">
    <props.Pagination />
    <DataTable
      data={props.issues}
      margin={{ vertical: 'large' }}
      columns={[
        {
          property: 'number',
          header: <Text>Number</Text>,
          primary: true,
          render: (datum) => (
            <Link to={`/issue/${datum.number}`}>#{datum.number}</Link>
          ),
        },
        {
          property: 'title',
          header: <Text>Title</Text>,
          render: (datum) => <Text>{datum.title}</Text>,
        },
      ]}
    />
    <props.Pagination />
  </Box>
)
