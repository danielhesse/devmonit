import { IAccountsRepository } from "../../repositories/IAccountsRepository";

type RegisterAccountRequest = {
  name: string;
  email: string;
  phone: string;
}

export class RegisterAccount {
  constructor(
    private accountsRepository: IAccountsRepository,
  ) { }

  async execute({ name, email, phone }: RegisterAccountRequest) {
    const accountExists = this.accountsRepository.findByEmail(email);

    if (accountExists) {
      throw new Error("Account already exists.");
    }

    const account = this.accountsRepository.create({
      name,
      email,
      phone
    });

    return account;
  }
}
