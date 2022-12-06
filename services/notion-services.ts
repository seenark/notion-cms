import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { IBlogPostResponse } from "../pages/@types/notion-blogpost";
import { BlogPost, PostPage } from "../pages/@types/schema";
import { validateEnv } from "./validateEnv";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    const env = validateEnv();
    this.client = new Client({
      auth: env.NOTION_ACCESS_TOKEN,
    });

    this.n2m = new NotionToMarkdown({
      notionClient: this.client,
    });
  }

  async getPublishedBlogPost(): Promise<BlogPost[]> {
    const env = validateEnv();
    const response = await this.client.databases.query({
      database_id: env.NOTION_BLOG_DATABASE_ID,
      filter: {
        type: "status",
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Publish date",
          direction: "ascending",
        },
      ],
    });
    return response.results.map((res) => {
      // transform this response to BlogPost
      return NotionService.pageToBlogPostTransformer(res);
    });
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    const env = validateEnv();
    let response = await this.client.databases.query({
      database_id: env.NOTION_BLOG_DATABASE_ID,
      filter: {
        type: "formula",
        property: "slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    if (!response.results[0]) {
      throw "No result available";
    }

    const page = response.results[0];
    console.log("page", page);
    const mdBlock = await this.n2m.pageToMarkdown(page.id);
    console.log("md block", mdBlock);
    const markdown = this.n2m.toMarkdownString(mdBlock);
    console.log("markdown", markdown);
    const post = NotionService.pageToBlogPostTransformer(page);

    const p: PostPage = {
      markdown,
      post,
    };

    return p;
  }

  private static pageToBlogPostTransformer(
    page: QueryDatabaseResponse["results"][0]
  ): BlogPost {
    const p = page as PageObjectResponse;
    let cover = "";
    if (p.cover) {
      switch (p.cover.type) {
        case "file":
          cover = p.cover.file.url;
          break;
        case "external":
          cover = p.cover.external.url;
          break;
        default:
          // add default cover image
          cover = "";
      }
    }

    const properties =
      p.properties as unknown as IBlogPostResponse["properties"];

    const blogpost: BlogPost = {
      id: p.id,
      cover: cover,
      title: properties.Name.title[0].plain_text,
      description: properties.Description.rich_text[0].plain_text,
      publishDate: properties["Publish date"].date.start,
      slug: properties.slug.formula.string,
      writter: properties.Writer.id,
    };
    return blogpost;
  }
}
