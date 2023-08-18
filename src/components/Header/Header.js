import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { Rss } from "react-feather";
import DarkLightToggle from "../DarkLightToggle";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

function Header({ theme, className, ...delegated }) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <DarkLightToggle theme={theme} className={styles.action} />
      </div>
    </header>
  );
}

export default Header;
