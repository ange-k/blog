import { getOgImage } from "../../components/OgImage";
import { getSortedPosts } from "@utils/content-utils";

export async function getStaticPaths() {
  const allBlogPosts = await getSortedPosts();

  return allBlogPosts.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}

export async function GET({ params }: { params: { slug: string } }) {
  const allBlogPosts = await getSortedPosts();

  const post = allBlogPosts.find((p) => p.slug === params.slug);
  const body = await getOgImage(post?.title ?? 'No Title', 'ange-k', post?._sys.updatedAt ? new Date(post._sys.updatedAt).toISOString() : new Date().toISOString());
  return new Response(await body);
}