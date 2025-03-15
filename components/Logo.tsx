import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-space-grotesk text-3xl font-semibold bg-gradient-to-br bg-clip-text text-transparent from-white from-5% to-white/40"
    >
      Resume;
    </Link>
  );
};

export default Logo;
