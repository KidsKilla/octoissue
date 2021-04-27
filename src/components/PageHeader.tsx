import React from 'react'
import { Header, Nav, Box } from 'grommet'

export const PageHeader: React.FC<{
  avatar?: string
  menu: React.ReactNode
}> = (props) => (
  <Header background="dark-1" pad="small">
    <Box direction="row" align="center" gap="small">
      {props.children}
    </Box>
    <Nav direction="row">{props.menu}</Nav>
  </Header>
)
