import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand
} from 'reactstrap';

const Header = ({ showMobmenu }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const toggle = () => setDropdownOpen(previousState => !previousState);
  if (status === 'unauthenticated') {
    return router.push('/api/auth/signin');
  }

  return (
    <Navbar color="primary" expand="md" className="sticky-top">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <i className="bi bi-hexagon-fill"></i>
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <Nav className="me-auto" navbar></Nav>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="end">
        <DropdownToggle color="primary">
          <div style={{ lineHeight: '0px' }}>
            {status === 'loading' ? (
              <Skeleton circle />
            ) : (
              <Image
                src={session.user.image}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            )}
          </div>
        </DropdownToggle>
        <DropdownMenu>
          {/* <DropdownItem header>Info</DropdownItem> */}
          <DropdownItem>
            {status === 'loading' ? <Skeleton /> : 'My Account'}
          </DropdownItem>
          {/* <DropdownItem>Edit Profile</DropdownItem>  */}
          <DropdownItem divider />
          <DropdownItem
            onClick={() => (status === 'loading' ? signOut() : undefined)}
          >
            {status === 'loading' ? <Skeleton /> : 'Logout'}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
