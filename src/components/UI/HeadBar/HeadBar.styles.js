import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const Container = styled.div`
  min-height: 50px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  margin-bottom: 12px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`
export const Menu = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  justify-content: space-around;
`

export const CurrentPage = styled(Typography)`
  border-bottom: 2px solid #e64a19;
  cursor: pointer;
`

export const Avatar = styled.div`
  height: 38px;
  width: 38px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  border-radius: 50%;
`

export const Logo = styled.img`
  cursor: pointer;
  -webkit-user-drag: none;
`

export const Link = styled(Typography)`
  cursor: pointer;
`
