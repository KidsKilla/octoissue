import React from 'react'
import { Layer, Box, Spinner, Text } from 'grommet'

export const LoadingIndicator: React.VFC<{
  visible: boolean
}> = (props) =>
  props.visible ? (
    <Layer animation="slide" background="dark-2" modal={false} position="top">
      <Box
        align="center"
        justify="center"
        gap="small"
        direction="row"
        alignSelf="center"
        pad={{ horizontal: 'large', vertical: 'medium' }}
      >
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    </Layer>
  ) : null
