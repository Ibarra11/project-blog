import React from "react";
import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import { readFile } from "node:fs/promises";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import path from "node:path";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import CircularColorsDemo from "@/components/CircularColorsDemo/CircularColorsDemo";

import { notFound } from "next/navigation";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo/DivisionGroupsDemo")
);

const getBlogPost = React.cache(async (slug) => {
  try {
    const rawContent = await readFile(
      path.join(process.cwd(), `/content/${slug}.mdx`),
      { encoding: "utf-8" }
    );
    const { content, data } = matter(rawContent);
    return { type: "success", content, data };
  } catch (e) {
    return Promise.resolve({ type: "error", message: e.message });
  }
});

export async function generateMetadata({ params }) {
  const data = await getBlogPost(params.postSlug);
  return {
    title: data.title,
    content: data.abstract,
    description: "name",
  };
}

async function BlogPost({ params }) {
  const result = await getBlogPost(params.postSlug);
  if (result.type === "error") {
    return notFound();
  }
  const { data, content } = result;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={data.title} publishedOn={data.publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          components={{
            pre: CodeSnippet,
            ...(data.title === "Understanding the JavaScript Modulo Operator"
              ? {
                  DivisionGroupsDemo: DivisionGroupsDemo,
                  CircularColorsDemo: CircularColorsDemo,
                }
              : {}),
          }}
          source={content}
        />
      </div>
    </article>
  );
}

export default BlogPost;
