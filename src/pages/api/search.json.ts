export const prerender = false

import { newtClient } from '@/lib/newt';
import type { Article } from '@/lib/newt';

export async function GET({request}) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const keyword = params.get('keyword');

    const { items: allBlogPosts } = await newtClient.getContents<Article>({
        appUid: 'blog',
        modelUid: 'article',
        query: {
            body: {
                match: keyword
            }
        }
    });

    return new Response(JSON.stringify({ results: allBlogPosts }), {
      headers: {
          'Content-Type': 'application/json'
      }
  });
}