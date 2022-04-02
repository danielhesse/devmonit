import { Account } from "../../../domain/entities/Account";
import { RegisterAccountDto } from "../../dtos/RegisterAccountDto";
import { IAccountsRepository } from "../IAccountsRepository";

export class InMemoryAccountsRepository implements IAccountsRepository {
  constructor(private repository: Account[] = []) { }

  create({ name, email, phone }: RegisterAccountDto): Account {
    const account = Account.create({
      name,
      email,
      phone
    });

    this.repository.push(account);

    return account;
  }

  findByEmail(email: string): Account | null {
    const account =
      this.repository.find(account => account.props.email === email);

    if (!account) return null;

    return account;
  }
}
