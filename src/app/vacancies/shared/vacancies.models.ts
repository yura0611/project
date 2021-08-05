export interface VacanciesTableItem {
  _id: string;
  vacancy: string;
  type: string;
  status: string;
  number_of_applicants: number;
  opened: string;
  description: string;
}


export interface ApplicationsTableItem {
  _id: string;
  candidate: string;
  status: string;
  score: number;
  reviewer: string;
  invited: string;
}


export interface TestVacanciesTableItem {
  _id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  questions: [];
}
