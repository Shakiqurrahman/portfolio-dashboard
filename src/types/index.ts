export type IProject = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    subTitle?: string | null;
    sourceLink?: string | null;
    liveLink?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type IBlog = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };