export interface IProduct {
  id         : number;
  name       : string;
  description: string;
  price      : number;
  category   : string;
  stock      : number;
  image      : string;
}

export interface IResponseProduct {
  products   : IProduct[];
  loading    : boolean;
  error      : string | null;
  search     : string;
  currentPage: number;
  totalPages : number;
  setSearch  : (term: string) => void;
  goToPage   : (page: number) => void;
  nextPage   : () => void;
  prevPage   : () => void;
}
