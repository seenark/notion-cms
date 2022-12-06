import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Icon {
  type: string;
  emoji: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Text {
  content: string;
  link?: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: any;
}

export interface Description {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface Image {
  id: string;
  type: string;
  url?: any;
}

export interface Formula {
  type: string;
  string: string;
}

export interface Slug {
  id: string;
  type: string;
  formula: Formula;
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface TypeOfContent {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

export interface Visuals {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface MultiSelect2 {
  id: string;
  name: string;
  color: string;
}

export interface Audience {
  id: string;
  type: string;
  multi_select: MultiSelect2[];
}

export interface Person {
  object: string;
  id: string;
}

export interface Writer {
  id: string;
  type: string;
  people: Person[];
}

export interface URL {
  id: string;
  type: string;
  url?: any;
}

export interface Status2 {
  id: string;
  name: string;
  color: string;
}

export interface Status {
  id: string;
  type: string;
  status: Status2;
}

export interface Date {
  start: string;
  end?: any;
  time_zone?: any;
}

export interface PublishDate {
  id: string;
  type: string;
  date: Date;
}

export interface Person2 {
  object: string;
  id: string;
}

export interface Reviewer {
  id: string;
  type: string;
  people: Person2[];
}

export interface Text2 {
  content: string;
  link?: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Title {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href?: any;
}

export interface Name {
  id: string;
  type: string;
  title: Title[];
}

export interface Properties {
  Description: Description;
  Image: Image;
  slug: Slug;
  "Type of content": TypeOfContent;
  Visuals: Visuals;
  Audience: Audience;
  Writer: Writer;
  URL: URL;
  Status: Status;
  "Publish date": PublishDate;
  Reviewer: Reviewer;
  Name: Name;
}

export interface IBlogPostResponse extends PageObjectResponse {
  properties: Properties;
}
