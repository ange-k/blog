import { createClient } from 'newt-client-js'

interface Meta {
  title: string;
  description: string;
  ogImage: any | null;
}

interface CoverImage {
  _id: string;
  altText: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  height: number;
  metadata: Record<string, any>;
  src: string;
  title: string;
  width: number;
}

interface AuthorSysRaw {
  createdAt: string;
  updatedAt: string;
  firstPublishedAt: string;
  publishedAt: string;
}

interface AuthorSys {
  raw: AuthorSysRaw;
  createdAt: string;
  updatedAt: string;
}

interface Author {
  _id: string;
  _sys: AuthorSys;
  fullName: string;
  slug: string;
  biography: string;
  profileImage: any | null;
}

interface TagSysRaw {
  createdAt: string;
  updatedAt: string;
  firstPublishedAt: string;
  publishedAt: string;
}

interface TagSys {
  raw: TagSysRaw;
  createdAt: string;
  updatedAt: string;
}

interface Tag {
  _id: string;
  _sys: TagSys;
  name: string;
  slug: string;
}

interface SysRaw {
  createdAt: string;
  updatedAt: string;
  firstPublishedAt: string;
  publishedAt: string;
}

interface Sys {
  raw: SysRaw;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id: string;
  _sys: Sys;
  title: string;
  slug: string;
  meta: Meta;
  body: string;
  coverImage: CoverImage;
  author: Author;
  tags: Tag[];
  data: { // 拡張
    nextSlug: string;
    nextTitle: string;
    prevSlug: string;
    prevTitle: string;
  };
  category: {
    name: string;
  }
}


export const newtClient = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: 'cdn',
})