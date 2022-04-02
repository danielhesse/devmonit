import { Account } from "../../domain/entities/Account";
import { RegisterAccountDto } from "../dtos/RegisterAccountDto";

export interface IAccountsRepository {
  create({ name, email, phone }: RegisterAccountDto): Account;
  findByEmail(email: string): Account | null;
}
