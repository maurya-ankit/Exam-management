import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, Nav, NavItem } from 'reactstrap';

import Logo from '../../logo/Logo';
const newsfeed = {
  title: 'News Feed',
  href: '/newsfeed',
  icon: 'bi bi-file-earmark-bar-graph'
};
const gradeRange = {
  title: 'Grade Range',
  href: '/admin/grade_range',
  icon: 'bi bi-bar-chart-line'
};
const students = {
  title: 'Students',
  href: '/admin/students',
  icon: 'bi bi-person-lines-fill'
};
const courses = {
  title: 'Add Course',
  href: '/admin/add_course',
  icon: 'bi bi-gear'
};
const users = {
  title: 'Users',
  href: '/admin/users',
  icon: 'bi bi-person-circle'
};
const result = {
  title: 'Result',
  href: '/result',
  icon: 'bi bi-file-earmark-bar-graph'
};
const adminNavigation = [users, courses, gradeRange, students];
const facultyNavigation = [newsfeed, gradeRange];
const studentNavigation = [newsfeed, result];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const { data: session } = useSession();
  const location = curl.pathname;
  const [navigation, setNavigation] = useState([]);
  console.log(session);
  useEffect(() => {
    switch (session?.user.role) {
      case 'admin': {
        setNavigation(adminNavigation);

        break;
      }
      case 'faculty': {
        setNavigation(facultyNavigation);

        break;
      }
      case 'student': {
        setNavigation(studentNavigation);

        break;
      }
      // No default
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
          {navigation.length > 0 ? (
            navigation.map((navi, index) => (
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
            ))
          ) : (
            <Skeleton count={4} height={60} className="sidenav-bg" />
          )}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
