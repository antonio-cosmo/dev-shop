import { styled } from "../stitches.config"

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  div: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    span: {
      fontSize: 24,
      fontWeight: 700,
      fontStyle: 'italic'
    }
  }
})