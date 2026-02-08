interface Author {
  _id: string;
  name: string;
  avatar: string;
}

interface Tag {
  _id: string;
  name: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
  author: Author;
}
