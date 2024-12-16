export type TShowType = 'TV Show' | 'Movie';

export type TShow = {
  show_id: string;
  type: TShowType;
  title: string;
  director?: string;
  cast?: string;
  country: string;
  date_added?: Date;
  release_year: number;
  rating?: string;
  duration: string;
  listed_in: string;
  description: string;
};

export type TUser = {
  name?: string;
  email: string;
  password?: string;
  age?: number;
};

export type TShowsParams = Partial<{
  page: number | string;
  per_page: number | string;
  type: TShowType;
  search: string;
}>;
