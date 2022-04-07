import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button
} from 'reactstrap';
import LogoWhite from '../../assets/images/logos/xtremelogowhite.svg';
import user1 from '../../assets/images/users/user1.jpg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Header = ({ showMobmenu }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  if (status === 'unauthenticated') {
    return router.push('/api/auth/signin');
  }
  if (status === 'loading') {
    return <div>Loading</div>;
  }

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <i className="bi bi-hexagon-fill"></i>
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
        <Nav className="me-auto" navbar>
          
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="end">
          <DropdownToggle color="primary">
            <div style={{ lineHeight: '0px' }}>
              <Image
                src={session.user.image}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>Info</DropdownItem> */}
            <DropdownItem>My Account</DropdownItem>
            {/* <DropdownItem>Edit Profile</DropdownItem>  */}
            <DropdownItem divider />
            <DropdownItem onClick={() => signOut()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </Navbar>
  );
};

export default Header;
