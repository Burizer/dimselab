export interface Item
{
  uid: string;
  item: string;
  amount: string;
  description: string;
  keywords: string;
  link: string;

  [key: string]: string
};