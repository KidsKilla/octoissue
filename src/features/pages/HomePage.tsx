import React, { useState } from 'react'
import { Form, Heading, Box, Button, Paragraph, Menu } from 'grommet'
import { useGHRepoData } from '../../hooks/useGHRepoData'
import { GHRepoData } from '../../app-logic/GHRepoData'
import { PageBody } from '../../components/PageBody'
import { TextField } from '../../components/TextField'
import { Alert } from '../../components/Alert'

const EXAMPLES: GHRepoData[] = [
  'facebook/react',
  'facebook/create-react-app',
  'KidsKilla/octoissue',
]
  .map((it) => it.split('/'))
  .map(([owner, repo]) => ({ owner, repo }))

export const HomePage: React.FC = () => {
  const { owner, repo, request, updateRepoData } = useGHRepoData()
  const [formVal, setFormVal] = useState({
    owner,
    repo,
  })
  return (
    <PageBody>
      <Heading>Welcome to octoissue!</Heading>
      <Paragraph>
        Please, type the owner and the repo name you want to list. You can try{' '}
        <Menu
          dropProps={{ align: { bottom: 'bottom', left: 'left' } }}
          label="known repos"
          items={EXAMPLES.map((it) => ({
            label: `${it.owner}/${it.repo}`,
            onClick: () => setFormVal(it),
          }))}
        />
      </Paragraph>
      {request.error && (
        <Alert
          title={`Failed to load ${owner}/${repo}`}
          message={request.error.message}
          footer="Please, verify if names are valid"
        />
      )}
      <Form<GHRepoData>
        method="GET"
        action="/issues"
        onSubmit={({ value }) => {
          if (!value.owner.trim()) {
            return
          }
          if (!value.repo.trim()) {
            return
          }
          updateRepoData(value.owner.trim(), value.repo.trim())
        }}
      >
        <TextField
          name="owner"
          label="Owner"
          value={formVal.owner || ''}
          onChange={(owner) => setFormVal({ ...formVal, owner })}
        />
        <TextField
          name="repo"
          label="Repo"
          value={formVal.repo || ''}
          onChange={(repo) => setFormVal({ ...formVal, repo })}
        />
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </PageBody>
  )
}
