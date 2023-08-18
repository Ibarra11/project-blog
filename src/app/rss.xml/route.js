const RSS = require("rss");
import { getBlogPostList } from "@/helpers/file-helpers";
export async function GET() {
  const feed = new RSS({
    title: "Bits & Bytes",
    description: "A blog centered around frontend development",
    url: "http://bits&bytes.com",
  });
  const posts = await getBlogPostList();
  for (const post of posts) {
    console.log(post.publishedAt);
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `http://bits&bytes.com/${post.slug}`,
      guid: `http://bits&bytes.com/${post.slug}`,
      author: "Alan Ibarra",
    });
  }
  return new Response(feed.xml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
