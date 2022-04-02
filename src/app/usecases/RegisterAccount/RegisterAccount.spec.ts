import { InMemoryAccountsRepository } from "../../repositories/in-memory/InMemoryAccountsRepository";
import { RegisterAccount } from "./RegisterAccount";

let registerAccount: RegisterAccount;

describe("Register account use case", () => {
  beforeEach(() => {
    const accountsRepository = new InMemoryAccountsRepository();

    registerAccount = new RegisterAccount(accountsRepository);
  });

  it("should be able to register a new account", () => {
    const response = registerAccount.execute({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    });

    expect(response).toBe(response);
  });

  it("should not be able to register a new account with existing email", async () => {
    await registerAccount.execute({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    });

    await expect(registerAccount.execute({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    })).rejects.toEqual(new Error("Account already exists."));
  });
});
