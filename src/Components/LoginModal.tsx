import React, { MouseEvent } from 'react'
import { Button, ButtonProps, Icon, Menu, Modal } from 'semantic-ui-react'

function LoginModal({
  signInModalOpen,
  setSignInModalOpen,
  handleSignInClick,
}: {
  signInModalOpen: boolean
  setSignInModalOpen: (open: boolean) => void
  handleSignInClick: (
    e: MouseEvent<HTMLButtonElement>,
    data: ButtonProps
  ) => void
}) {
  return (
    <Modal
      size={'mini'}
      dimmer={'blurring'}
      onOpen={() => setSignInModalOpen(true)}
      onClose={() => setSignInModalOpen(false)}
      open={signInModalOpen}
      trigger={
        <Menu.Item>
          <Button circular basic color="blue">
            <Icon name={'user circle'} />
            Sign in
          </Button>
        </Menu.Item>
      }
    >
      <Modal.Header>Sign in with your favourite SSO</Modal.Header>
      <Modal.Content>
        <Button name="google" basic onClick={handleSignInClick}>
          <Icon name="google" />
          Google
        </Button>
        <Button name="github" basic onClick={handleSignInClick}>
          <Icon name="github" />
          GitHub
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default LoginModal