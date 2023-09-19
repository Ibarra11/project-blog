import styles from "./not-found.module.css";
import React from "react";
export const dynamic = "force-dynamic";
export default function NotFound() {
  // await sleep(1000);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Page not found</h2>
      <Loading />
    </div>
  );
}

async function Loading() {
  return (
    <p>This page does not exist. Please check the url and visit another page</p>
  );
}

async function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
