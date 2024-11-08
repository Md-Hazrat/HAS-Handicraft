import Link from "next/link";
import React from "react";
import Menu from "./menu";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            HAS HandiCraft
          </Link>
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
