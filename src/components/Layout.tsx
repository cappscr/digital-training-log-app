import React from 'react'
import Container from 'react-bootstrap/Container'

interface Props {
  children?: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return <Container as="main">{children}</Container>
}
