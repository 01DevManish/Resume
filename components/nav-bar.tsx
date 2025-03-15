import Link from "next/link";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="space-x-4">
      <Button variant="secondary" className="group" asChild>
        <Link href="auth/login">
          Login
          <span className="bg-[#ffffff26] group-hover:bg-[#ffffff13] rounded-[2px] ml-2 px-2 transition-colors">
            L
          </span>
        </Link>
      </Button>
      <Button asChild>
        <Link href="auth/register">Register</Link>
      </Button>
    </nav>
  );
};

export default NavBar;
