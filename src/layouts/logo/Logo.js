import Link from 'next/link';
const Logo = () => {
  return (
    <Link href="/">
      <a className="text-decoration-none">
        <i className="bi bi-hexagon-fill"></i> Exam Management
      </a>
    </Link>
  );
};

export default Logo;
