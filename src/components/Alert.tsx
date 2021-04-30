import React from 'react'
import { Card, CardBody, CardFooter, Text, Box } from 'grommet'
import { Alert as WarnIcon } from 'grommet-icons'

export const Alert: React.VFC<{
  title: string
  message: string
  footer: string
}> = (props) => (
  <Card background="#FFBC44">
    <CardBody pad="small">
      <Box gap="small" pad="small" flex justify="start" direction="row">
        <WarnIcon size="large" color="plain" />
        <Box margin={{ left: 'small' }}>
          <Text size="small" weight="bold">
            {props.title}
          </Text>
          <Text size="small">{props.message}</Text>
        </Box>
      </Box>
    </CardBody>
    {props.footer && (
      <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Text size="xsmall">{props.footer}</Text>
      </CardFooter>
    )}
  </Card>
)
