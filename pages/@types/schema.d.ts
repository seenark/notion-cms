export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  description: string;
  publishDate: string;
  writter: string;
  slug: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
