import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BlogCard from "../components/BlogCard";
import NotionService from "../services/notion-services";
import { BlogPost } from "./@types/schema";

interface IHomeProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPost();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<IHomeProps> = ({ posts }) => {
  const title = "Test blog";
  const description = "Welcome to my Notion blog";
  console.log("post", posts);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={"description"}
          title="description"
          content={description}
        ></meta>
      </Head>

      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
              NotionBlog
            </h1>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post}></BlogCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;
