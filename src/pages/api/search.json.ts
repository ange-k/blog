export const prerender = false

import { newtClient } from '@/lib/newt';
import type { Article } from '@/lib/newt';

export async function GET({request}:{request: { url: string}}) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const keyword = params.get('keyword');

    if (keyword === null || keyword.length === 0) {
        return new Response(JSON.stringify({ results: [] }))
    }

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