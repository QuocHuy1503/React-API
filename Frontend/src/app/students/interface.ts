export interface IModalConfig {
  type: string | null;
  data: IStudent | null;
}

export interface IStudent {
  id: string;
  full_name: string;
  birthday: string;
  phone: string;
  email: string;
  gender: string;
}
