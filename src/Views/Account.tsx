import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Button,
  Sidebar,
  ButtonProps,
  Segment,
  Header,
  Icon,
  Menu,
  MenuItemProps,
  SemanticICONS,
  MenuItem,
  Input,
  ButtonGroup,
  InputProps,
  Message,
} from 'semantic-ui-react'
import link from '../lib/link'
import useStore from '../store'
import { getDatabase, ref, update, get } from 'firebase/database'

function VerticalMenuItem(props: {
  children: JSX.Element | null | string
  activeItem: string
  name: string
  onClick: (e: MouseEvent, data: MenuItemProps) => void
  icon: SemanticICONS
  disabled: boolean
}) {
  const { children, activeItem, name, onClick, icon, disabled } = props

  return (
    <Menu.Item
      name={name}
      active={activeItem === name}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <Icon name={icon} />
    </Menu.Item>
  )
}

export default function AccountView() {
  const firebaseApp = useStore(state => state.firebaseApp)
  const uid = useStore(state => state.firebaseUser?.uid)
  const [activeItem, setActiveItem] = useState('profile')
  const [visible, setVisible] = useState(true)

  const [userDetails, setUserDetails] = useState<
    Record<string, string | boolean>
  >({ upToDate: true })

  function fetchUserDetails() {
    if (!firebaseApp || !uid) return

    const db = getDatabase(firebaseApp)
    const userRef = ref(db, 'users/' + uid)

    get(userRef)
      .then(snapshot => {
        const data = snapshot.val()
        data.upToDate = true
        if (snapshot.exists()) {
          setUserDetails(data)
          console.debug('UserDetails: ', data)
        }
      })
      .catch(console.error)
  }

  useEffect(fetchUserDetails, [firebaseApp])

  function handleDetailChange(e: ChangeEvent, data: InputProps) {
    const inputName = data.name
    const inputValue = data.value

    userDetails[inputName] = inputValue
    userDetails.upToDate = false

    setUserDetails({ ...userDetails })

    console.log(inputName, inputValue, userDetails)
  }

  function updateUserDetail(e: MouseEvent, data: ButtonProps) {
    if (!firebaseApp || !uid) return

    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, 'users/' + uid)

    update(dbRef, userDetails).then(fetchUserDetails).catch(console.error)
  }

  function handleLinkClick(e: MouseEvent, { name }: ButtonProps) {
    link(name)
  }

  function handleItemClick(e: MouseEvent, data: MenuItemProps) {
    data.name && setActiveItem(data.name)
  }

  const panes: Record<string, () => JSX.Element> = {
    profile: () => (
      <div>
        <Header as={'h2'}>Edit your Account-Details</Header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
          }}
        >
          <Input
            name="displayName"
            label={{ content: 'Display Name', basic: true }}
            value={userDetails.displayName || ''}
            onChange={handleDetailChange}
            placeholder="mysite.com"
          />
          <Input
            name="username"
            label={{ content: 'Username', basic: true }}
            value={userDetails.username || ''}
            onChange={handleDetailChange}
            placeholder="mysite.com"
          />
          <Button fluid color="green" onClick={updateUserDetail}>
            Update Profile
          </Button>
          {!userDetails.upToDate && (
            <Message size={'mini'}>
              <Message.Header>You have unsaved changes</Message.Header>
            </Message>
          )}
        </div>
      </div>
    ),
    account: () => (
      <div>
        <Header as={'h2'}>Link your Account</Header>
        <Button name="google" basic onClick={handleLinkClick}>
          <Icon name="google" />
          Google
        </Button>
        <Button name="github" basic onClick={handleLinkClick}>
          <Icon name="github" />
          GitHub
        </Button>
      </div>
    ),
  }

  const activePane = panes[activeItem]?.()

  const Item = ({
    name = '',
    icon = 'cog',
    children = null,
    disabled = false,
  }: {
    name: string
    icon: SemanticICONS
    children: JSX.Element | null | string
    disabled?: boolean
  }) => (
    <VerticalMenuItem
      disabled={disabled}
      activeItem={activeItem}
      name={name}
      icon={icon}
      children={children}
      onClick={handleItemClick}
    />
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <Sidebar.Pushable
        as={Segment}
        style={{
          width: '80%',
          maxWidth: '1280px',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Sidebar
          as={Menu}
          animation="uncover"
          //onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="wide"
        >
          <Item name="profile" icon="user">
            Public Profile
          </Item>
          <Item name="account" icon="cog">
            Account
          </Item>
          <Item name="settings" icon="settings" disabled>
            Settings
          </Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>{activePane || null}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}