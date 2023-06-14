export interface IRequestNotionApiResponse {
  type: string;
  month?: number;
  length: number;
  difference?: {
    period: {
      start: string;
      end: string;
    };
    value: number;
    percent: number;
  };
}
