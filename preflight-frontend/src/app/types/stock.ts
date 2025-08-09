export type StockItem = {
  id: string;
  imageUrl?: string | null;
  title: string;
  productid?: string | null;
  category: string;
  amount: number;
};

export type Owner = {
  id: string;
  name: string;
  course_id: string;
  section: string;
};
