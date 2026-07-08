export type StrapiTextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiBlock =
  | {
      type: 'paragraph';
      children: StrapiTextNode[];
    }
  | {
      type: 'heading';
      level: 1 | 2 | 3 | 4 | 5 | 6;
      children: StrapiTextNode[];
    }
  | {
      type: 'list';
      format: 'ordered' | 'unordered';
      children: Array<{ type: 'list-item'; children: StrapiTextNode[] }>;
    }
  | {
      type: 'quote';
      children: StrapiTextNode[];
    }
  | {
      type: 'code';
      children: StrapiTextNode[];
    }
  | {
      type: 'image';
      image?: {
        url: string;
        alternativeText?: string;
      };
      children?: StrapiTextNode[];
    }
  | {
      type: 'list-item';
      children: StrapiTextNode[];
    };

export type LearningHubArticle = {
  id: number;
  title: string;
  slug: string;
  Description: string;
  Category_Tag: string;
  Reading_Time: number;
  Publish_Date: string;
  Is_Featured: boolean;
  Content: StrapiBlock[];
  Card_Image?: {
    url: string;
    alternativeText?: string;
  } | null;
};
