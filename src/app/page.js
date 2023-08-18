import React from "react";
import { readdir, readFile } from "node:fs/promises";
const matter = require("gray-matter");
import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import path from "node:path";

async function getBlogPostList() {
  const blogPostMetaData = [];
  const files = await readdir(path.join(process.cwd(), "/content"), {
    encoding: "utf-8",
  });
  for (const file of files) {
    const blogPost = await readFile(
      path.join(process.cwd(), `/content/${file}`),
      "utf8"
    );
    matter(blogPost)[""];
    blogPostMetaData.push({
      id: crypto.randomUUID(),
      slug: file.split(".")[0],
      ...matter(blogPost)["data"],
    });
  }
  return blogPostMetaData.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}

async function Home() {
  const blogPost = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPost.map((post) => (
        <BlogSummaryCard
          key={post.id}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
      {/* <BlogSummaryCard
        slug="example"
        title="Hello world!"
        abstract="This is a placeholder, an example which shows how the “BlogSummaryCard” component should be used. You'll want to swap this out based on the data from the various MDX files!"
        publishedOn={new Date()}
      /> */}
    </div>
  );
}

export default Home;
