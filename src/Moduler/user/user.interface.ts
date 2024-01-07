export type Tuser = {
  id: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'driver' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
