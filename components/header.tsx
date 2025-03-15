import Logo from "./Logo";
import NavBar from "./nav-bar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40">
      <div className="flex justify-between px-4 h-[4.1rem] bg-[#0a0a0a33] items-center backdrop-blur-lg">
        <Logo />
        {/* <NavBar /> */}
      </div>
      <hr className="m-0 h-[0.5px] w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/15 to-neutral-200/0" />
    </header>
  );
};

export default Header;
