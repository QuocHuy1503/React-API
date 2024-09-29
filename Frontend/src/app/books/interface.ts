export interface IModalConfig {
  type: string | null;
  data: IBook | null;
}


export interface IBook{
  id: string;
  title: string,
  description: string,
  price: number,
  author: string,
}
