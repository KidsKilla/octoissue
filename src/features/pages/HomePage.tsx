import React from 'react'
import {
  Form,
  FormField,
  Heading,
  TextInput,
  Box,
  Button,
  Paragraph,
  Menu,
} from 'grommet'
import { useGHRepoData } from '../../hooks/useGHRepoData'
import { GHRepoData } from '../../app-logic/GHRepoData'
import { PageBody } from '../../components/PageBody'

const EXAMPLES: GHRepoData[] = [
  'facebook/react',
  'facebook/create-react-app',
  'KidsKilla/octoissue',
]
  .map((it) => it.split('/'))
  .map(([owner, repo]) => ({ owner, repo }))

export const HomePage: React.FC = () => {
  const { owner, repo, updateRepoData } = useGHRepoData()
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
            onClick: () => updateRepoData(it.owner, it.repo),
          }))}
        />
      </Paragraph>
      <Form<GHRepoData>
        onSubmit={({ value }) => {
          if (!value.owner) {
            return
          }
          if (!value.repo) {
            return
          }
          updateRepoData(value.owner, value.repo)
        }}
      >
        <FormField name="owner" htmlFor="gh-owner" label="Owner">
          <TextInput id="gh-owner" name="owner" defaultValue={owner || ''} />
        </FormField>
        <FormField name="namerepo" htmlFor="gh-repo" label="Repo">
          <TextInput id="gh-repo" name="repo" defaultValue={repo || ''} />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </PageBody>
  )
}
