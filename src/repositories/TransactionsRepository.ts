import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((prev, curr) => prev + curr.value, 0);
    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((prev, curr) => prev + curr.value, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      ...data,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
