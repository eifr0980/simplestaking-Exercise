export default interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: Date;
  address: string;
}
