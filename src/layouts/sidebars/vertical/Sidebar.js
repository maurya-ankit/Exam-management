import { Button, Nav, NavItem } from 'reactstrap';
import Logo from '../../logo/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
const adminNavigation = [
  {
    title: 'Users',
    href: '/admin/users',
    icon: 'bi bi-person-circle'
  },
  {
    title: 'Add Course',
    href: '/admin/add_course',
    icon: 'bi bi-gear'
  },
  {
    title: 'Grade Range',
    href: '/admin/grade_range',
    icon: 'bi bi-bar-chart-line'
  },
  {
    title: 'Students',
    href: '/admin/students',
    icon: 'bi bi-person-lines-fill'
  }
];
const facultyNavigation = [
  {
    title: 'News Feed',
    href: '/newsfeed',
    icon: 'bi bi-file-earmark-bar-graph'
  },
  {
    title: 'Grade Range',
    href: '/admin/grade_range',
    icon: 'bi bi-bar-chart-line'
  },
];
const studentNavigation = [
  {
    title: 'News Feed',
    href: '/newsfeed',
    icon: 'bi bi-file-earmark-bar-graph'
  },
  {
    title: 'Result',
    href: '/result',
    icon: 'bi bi-file-earmark-bar-graph'
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const { data: session, status } = useSession();
  const location = curl.pathname;
  const [navigation, setNavigation] = useState([]);
  console.log(session);
  useEffect(() => {
    if (session?.user.role === 'admin') {
      setNavigation(adminNavigation);
    } else if (session?.user.role === 'faculty') {
      setNavigation(facultyNavigation);
    } else if (session?.user.role === 'student') {
      setNavigation(studentNavigation);
    }
  }, [session]);

  return (
    <div className="p-3 sticky-top">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.length ? navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? 'text-primary nav-link py-3'
                      : 'nav-link text-secondary py-3'
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          )): <Skeleton count={4} height={60} className="sidenav-bg" />}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
