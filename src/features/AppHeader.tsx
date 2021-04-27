import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useGHRepoData } from '../hooks/useGHRepoData'
import { Anchor } from 'grommet'

export const AppHeader: React.VFC = () => {
  const { owner, repo } = useGHRepoData()
  return (
    <PageHeader
      menu={[
        { label: 'Home', href: '/' },
        { label: 'All issues', href: '/issues' },
        // { label: 'One issue', href: '/issue/123' },
      ].map((item) => (
        <Link key={item.label} to={item.href}>
          <Anchor as="span">{item.label}</Anchor>
        </Link>
      ))}
    >
      {owner ? (
        <>
          Current repo: {owner}/{repo}
        </>
      ) : (
        <>Octoissue!</>
      )}
    </PageHeader>
  )
}
