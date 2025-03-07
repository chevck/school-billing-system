export interface BillCreateStructure {
  key: string;
  index: number;
  value: number;
}

export interface ProcessedBill {
  items?: BillCreateStructure[];
  total?: number;
  subtotal?: number;
  discount?: number;
}
