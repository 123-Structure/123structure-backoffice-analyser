import { IGetAllPagesResponse } from "./IGetAllPagesResponse";

export interface IGetCurrentMonthResponse extends IGetAllPagesResponse {
  difference: {
    period: {
      start: string;
      end: string;
    };
    value: number;
    percent: number;
  };
}
