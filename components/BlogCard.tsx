import Link from "next/link";
import { FC } from "react";
import { BlogPost } from "../pages/@types/schema";
import { format } from "date-fns";

interface IBlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<IBlogCardProps> = ({ post }) => {
  return (
    <>
      <Link href={`/post/${post.slug}`}>
        <div className="transition duration-300 hover:scale-105">
          <div className="flex flex-col rounded-xl shadow-lg overflow-hidden">
            {/* image */}
            <div className="flex-shrink-0">
              <img
                className="h-64 w-full object-fit"
                src={post.cover}
                alt="cover"
              />
            </div>
            {/* Text */}
            <div className="flex-1 bg-gray-50 pt-2 pb-6 px-4 flex flex-col justify-between">
              <div className="flex-1">
                {/* Date */}
                <span className="block mt-2">
                  <h4 className="text-xs font-medium text-gray-600">
                    {post.publishDate}
                  </h4>
                </span>
                {/* Title */}
                <span className="block mt-2">
                  <h4 className="text-xs font-medium text-gray-600">
                    {" "}
                    {post.title}{" "}
                  </h4>
                </span>
                {/* Description */}
                <span className="block mt-2">
                  <h4 className="text-xs font-medium text-gray-600">
                    {post.description}
                  </h4>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
