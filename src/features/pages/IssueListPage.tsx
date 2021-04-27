import React, { useEffect, useState } from 'react'
import {
  Heading,
  Box,
  Paragraph,
  Spinner,
  Pagination,
  DataTable,
  Text,
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
      pageSize: 30,
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
      {request.status === 'pending' && <Spinner />}
      {request.status === 'fulfilled' && allIssues.length === 0 && (
        <Paragraph>
          No issues in {props.owner}/{props.repo}!
        </Paragraph>
      )}
      {allIssues.length > 0 ? (
        <AllIssues
          issues={allIssues}
          totalCount={data?.open_issues_count || 0}
          pageSize={30}
          currentPage={currentPage}
          onChange={(x) => {
            console.log('xxx', x)
            setPage(x)
          }}
        />
      ) : undefined}
    </PageBody>
  )
}

const AllIssues: React.VFC<{
  issues: GHIssue[]
  totalCount: number
  pageSize: number
  currentPage: number
  onChange: (page: number) => void
}> = (props) => {
  const pagination = (
    <Pagination
      numberItems={Math.floor(props.totalCount / props.pageSize)}
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
