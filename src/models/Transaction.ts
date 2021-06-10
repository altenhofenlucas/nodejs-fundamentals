import { v4 as uuid } from 'uuid';

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

class Transaction {
  static readonly TransactionType = TransactionType;

  id: string;

  title: string;

  value: number;

  type: TransactionType.INCOME | TransactionType.OUTCOME;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
