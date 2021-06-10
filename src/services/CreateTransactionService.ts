import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (!Object.values(Transaction.TransactionType).includes(type)) {
      throw new Error("Transaction type must be 'income' or 'outcome'");
    }
    const { total } = this.transactionsRepository.getBalance();

    if (Transaction.TransactionType.OUTCOME === type && total < value) {
      throw new Error("You don't have enough balance");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
