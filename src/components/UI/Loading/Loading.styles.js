import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ fullHeight }) => (fullHeight ? 'calc(100vh - 78px)' : '90px')};
  min-width: 140px;
`
