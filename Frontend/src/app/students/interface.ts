export interface IModalConfig {
  type: string | null;
  data: IStudent | null;
}

export interface IStudent {
  student_id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}