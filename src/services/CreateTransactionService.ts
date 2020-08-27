import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: Request): Transaction {
    if (request.type === 'outcome') {
      const currentBalance = this.transactionsRepository.getBalance();
      if (currentBalance.total < request.value)
        throw Error('There is not enouh balance');
    }
    return this.transactionsRepository.create({
      title: request.title,
      value: request.value,
      type: request.type,
    });
  }
}

export default CreateTransactionService;
