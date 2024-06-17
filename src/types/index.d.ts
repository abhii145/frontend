declare type User = {
  name: string;
  email: string;
  role: string;
  _id: string;
};

declare type UserProps = {
  user: User | null;
  loading?: boolean;
};
