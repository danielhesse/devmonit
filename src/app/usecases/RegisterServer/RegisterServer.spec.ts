import { Account } from "../../../domain/entities/Account";
import { InMemoryAccountsRepository } from "../../repositories/in-memory/InMemoryAccountsRepository";
import { InMemoryServersRepository } from "../../repositories/in-memory/InMemoryServersRepository";
import { RegisterServer } from "./RegisterServer";

let registerServer: RegisterServer;

let account: Account;

describe("Register server use case", () => {
  beforeAll(() => {
    const accountsRepository = new InMemoryAccountsRepository();

    account = accountsRepository.create({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    });
  });

  beforeEach(() => {
    const serversRepository = new InMemoryServersRepository();

    registerServer = new RegisterServer(serversRepository);
  });

  it("should be able to register a new server", async () => {
    const response = await registerServer.execute({
      accountId: account.id,
      name: "Server 1",
      description: "Description server 1",
      url: "https://sharbe.com.br"
    });

    expect(response).toBe(response);
  });

  it("should be able to register a new server without the url", async () => {
    const response = await registerServer.execute({
      accountId: account.id,
      name: "Server 1",
      description: "Description server 1",
      url: "https://sharbe.com.br"
    });

    expect(response).toBe(response);
  });

  it("should not be able to register a new server with existing name", async () => {
    await registerServer.execute({
      accountId: account.id,
      name: "Server 1",
      description: "Description server 1",
      url: "https://sharbe.com.br"
    });

    await expect(registerServer.execute({
      accountId: account.id,
      name: "Server 1",
      description: "Description server 1",
      url: "https://sharbe.com.br"
    })).rejects.toEqual(new Error("Server already exists."));
  });
});
