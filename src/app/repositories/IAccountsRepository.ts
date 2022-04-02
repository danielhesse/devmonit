import { Account } from "../../domain/entities/Account";
import { RegisterAccountDto } from "../dtos/RegisterAccountDto";

export interface IAccountsRepository {
  create(data: RegisterAccountDto): Account;
  findByEmail(email: string): Account | null;
}
