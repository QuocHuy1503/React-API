export interface IModalConfig {
  type: string | null;
  data: IUser | null;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}