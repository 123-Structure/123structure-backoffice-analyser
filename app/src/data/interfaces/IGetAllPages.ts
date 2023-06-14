export interface IGetAllPages {
  type: string;
  length: number;
  period: {
    start: string;
    end: string;
  };
}
