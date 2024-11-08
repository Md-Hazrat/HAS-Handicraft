"use client";
import useCartService from "@/lib/hooks/useCartStore";
import useLayoutService from "@/lib/hooks/useLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";
import { HiMoon } from "react-icons/hi";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBox } from "./searchBox";

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const { data: session } = useSession();

  const { theme, toggleTheme } = useLayoutService();

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className="hidden md:block">
        <SearchBox />
      </div>
      <div>
        <ul className="flex items-stretch">
          <i>
            {mounted && (
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={theme === "light"}
                  onChange={toggleTheme}
                />

                {/* sun icon */}

                <WiDaySunny className="swap-on fill-current w-10 h-10" />
                {/* moon icon */}
                <HiMoon className="swap-off fill-current w-10 h-10" />
              </label>
            )}
          </i>
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/cart">
              Cart
              {mounted && items?.length != 0 && (
                <div className="badge badge-secondary">
                  {items?.reduce((a, c) => a + c?.qty, 0)}{" "}
                </div>
              )}
            </Link>
          </li>
          {session && session?.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    {session.user.name}
                    <HiOutlineChevronDown className="w-6 h-6" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                  >
                    {session?.user?.isAdmin && (
                      <li onClick={handleClick}>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                      </li>
                    )}

                    <li onClick={handleClick}>
                      <Link href="/order-history">Order history </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                className="btn btn-ghost rounded-btn"
                type="button"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
