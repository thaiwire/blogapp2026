export interface IUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  username: string;
  profile_pic?: string;
  created_at: Date;
  updated_at: Date;
}
