export declare type CategoryFilter = {
  status: string;
  isPlan?: boolean;
  user_key: string;
};

export declare type ReportFilter = {
  time: string;
  userKey: string;
  status: string;
};

export declare type UpdateCategoryFilter = {
  id: number;
  user_key: string;
  data: {
    amount: number;
  }
}