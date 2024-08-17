import { newtClient, type Article } from '@/lib/newt'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import { getCollection } from 'astro:content'

export async function getSortedPosts():Promise<Article[]> {
  // const allBlogPosts = await getCollection('posts', ({ data }) => {
  //   return import.meta.env.PROD ? data.draft !== true : true
  // })
  
  const { items: allBlogPosts } = await newtClient.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
  })

  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a._sys.raw.publishedAt)
    const dateB = new Date(b._sys.raw.publishedAt)
    return dateA > dateB ? -1 : 1
  })

  for (let i = 0; i < sorted.length; i ++) {
    sorted[i].data = {
      nextSlug: '',
      nextTitle: '',
      prevSlug: '',
      prevTitle: ''
    }
  }

  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug
    sorted[i].data.nextTitle = sorted[i - 1].title
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug
    sorted[i].data.prevTitle = sorted[i + 1].title
  }

  return sorted
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const { items: allBlogPosts } = await newtClient.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
  })

  const countMap: { [key: string]: number } = {}
  allBlogPosts.map(post => {
    post.tags.map((t) => t.name).map((tag: string) => {
      if (!countMap[tag]) countMap[tag] = 0
      countMap[tag]++
    })
  })

  // sort tags
  const keys: string[] = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  return keys.map(key => ({ name: key, count: countMap[key] }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const { items: allBlogPosts } = await newtClient.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
  })

  const count: { [key: string]: number } = {}
  allBlogPosts.map(post => {
    if (!post.category) {
      const ucKey = i18n(I18nKey.uncategorized)
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
      return
    }
    count[post.category.name] = count[post.category.name]
      ? count[post.category.name] + 1
      : 1
  })

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  const ret: Category[] = []
  for (const c of lst) {
    ret.push({ name: c, count: count[c] })
  }
  return ret
}
