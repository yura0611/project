export interface IQuestion {
  _id: string;
  title: string;
  type: string;
  topics: string[];
  description: string;
  maxLength: number;
}
