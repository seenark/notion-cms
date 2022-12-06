import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import NotionService from "../../services/notion-services";
import { PostPage } from "../@types/schema";

interface IPostProps {
  page: PostPage;
}

const Post: FC<IPostProps> = ({ page }) => {
  const { post, markdown } = page;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          title="description"
          content={post.description}
        />
        <meta
          name="og:description"
          title="og:description"
          content={post.description}
        />
        <meta name="og:image" title="og:title" content={post.cover} />
      </Head>
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <article className="prose">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const notionServic = new NotionService();

  const posts = await notionServic.getPublishedBlogPost();

  const paths = posts.map((post) => `/post/${post.slug}`);
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps> = async (context) => {
  const notionServic = new NotionService();

  const page = await notionServic.getSingleBlogPost(
    context.params?.slug as string
  );

  if (!page) {
    throw "Error";
  }

  return {
    props: {
      page: page,
    },
  };
};

export default Post;
