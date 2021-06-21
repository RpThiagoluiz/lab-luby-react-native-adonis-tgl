export interface userData {
  created_at: Date;
  email: string;
  updated_at: Date;
  username: string;
}

export interface UpdateUser {
  username: string;
  email: string;
  password: string;
}
