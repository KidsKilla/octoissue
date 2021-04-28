import React, { useEffect, useState } from 'react'
import {
  Heading,
  Box,
  Paragraph,
  Spinner,
  Pagination,
  DataTable,
  Text,
  Layer,
} from 'grommet'
import { Link } from 'react-router-dom'
import { PageBody } from '../../components/PageBody'
import { useGHRepoData } from '../../hooks/useGHRepoData'
import { useGHIssues } from '../../hooks/useGHIssues'
import { GHIssue } from '../../app-logic/store.issue'
import { RepoMissing } from '../../components/RepoMissing'
import { GHRepoData } from '../../app-logic/GHRepoData'
import { usePrevious } from '../../hooks/usePrev'

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
  const { data } = useGHRepoData()
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
      {request.status === 'pending' && (
        <Layer animation="slide">
          <Box
            align="center"
            justify="center"
            gap="small"
            direction="row"
            alignSelf="center"
            pad="large"
          >
            <Spinner />
            <Text>Loading...</Text>
          </Box>
        </Layer>
      )}
      {request.status === 'fulfilled' && allIssues.length === 0 && (
        <Paragraph>
          No issues in {props.owner}/{props.repo}!
        </Paragraph>
      )}
      {allIssues.length > 0 ? (
        <AllIssues
          issues={allIssues}
          pagesCount={(data?.open_issues_count || 0) / PAGE_SIZE}
          currentPage={currentPage}
          onChange={setPage}
        />
      ) : undefined}
    </PageBody>
  )
}

const AllIssues: React.VFC<{
  issues: GHIssue[]
  pagesCount: number
  currentPage: number
  onChange: (page: number) => void
}> = (props) => {
  const pagination = (
    <Pagination
      numberItems={props.pagesCount}
      page={props.currentPage}
      numberEdgePages={2}
      onChange={(evt) => props.onChange(evt.page)}
    />
  )
  return (
    <Box pad="large">
      {pagination}
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
      {pagination}
    </Box>
  )
}
