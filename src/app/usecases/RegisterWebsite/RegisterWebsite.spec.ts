import { Account } from "../../../domain/entities/Account";
import { InMemoryAccountsRepository } from "../../repositories/in-memory/InMemoryAccountsRepository";
import { InMemoryWebsitesRepository } from "../../repositories/in-memory/InMemoryWebsitesRepository";
import { RegisterWebsite } from "./RegisterWebsite";

let registerWebsite: RegisterWebsite;

let account: Account;

describe("Register website use case", () => {
  beforeAll(() => {
    const accountsRepository = new InMemoryAccountsRepository();

    account = accountsRepository.create({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    });
  });

  beforeEach(() => {
    const websitesRepository = new InMemoryWebsitesRepository();

    registerWebsite = new RegisterWebsite(websitesRepository);
  });

  it("should be able to register a new website", async () => {
    const response = await registerWebsite.execute({
      accountId: account.id,
      name: "Website 1",
      description: "Description website 1",
      url: "https://sharbe.com.br"
    });

    expect(response).toBe(response);
  });

  it("should be able to register a new website without the url", async () => {
    const response = await registerWebsite.execute({
      accountId: account.id,
      name: "Website 1",
      description: "Description website 1",
      url: "https://sharbe.com.br"
    });

    expect(response).toBe(response);
  });

  it("should not be able to register a new website with existing name", async () => {
    await registerWebsite.execute({
      accountId: account.id,
      name: "Website 1",
      description: "Description website 1",
      url: "https://sharbe.com.br"
    });

    await expect(registerWebsite.execute({
      accountId: account.id,
      name: "Website 1",
      description: "Description website 1",
      url: "https://sharbe.com.br"
    })).rejects.toEqual(new Error("Website already exists."));
  });
});
