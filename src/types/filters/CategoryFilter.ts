export declare type CategoryFilter = {
  status: string;
  isPlan?: boolean;
};

export declare type ReportFilter = {
  time: string;
  userKey: string;
  status: string;
};

export declare type UpdateCategoryFilter = {
  id: string | number;
  data: {
    amount: number;
  }
}