import readingTime from "reading-time"
import { load } from 'cheerio'; 

const readTime = (html: string) => {
  const $ = load(html);
  const text = $.text();
  const stats = readingTime(text, { wordsPerMinute: 400 })
  return {
    time: stats.text,
    count: stats.words
  }
}

export default readTime;