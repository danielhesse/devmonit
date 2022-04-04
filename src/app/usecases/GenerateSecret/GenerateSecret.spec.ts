import { Account } from "../../../domain/entities/Account";
import { Server } from "../../../domain/entities/Server";
import { InMemoryAccountsRepository } from "../../repositories/in-memory/InMemoryAccountsRepository";
import { InMemorySecretsRepository } from "../../repositories/in-memory/InMemorySecretsRepository";
import { InMemoryServersRepository } from "../../repositories/in-memory/InMemoryServersRepository";
import { RegisterAccount } from "../RegisterAccount/RegisterAccount";
import { RegisterServer } from "../RegisterServer/RegisterServer";
import { GenerateSecret } from "./GenerateSecret";

let generateSecret: GenerateSecret;
let account: Account;
let server: Server;

describe("Generate secret use case", () => {
  beforeEach(async () => {
    const serversRepository = new InMemoryServersRepository();
    const registerServer = new RegisterServer(serversRepository);

    const secretsRepository = new InMemorySecretsRepository();

    const accountsRepository = new InMemoryAccountsRepository();
    const registerAccount = new RegisterAccount(accountsRepository);

    account = await registerAccount.execute({
      name: "Aiden Lyons",
      email: "aiden.lyons@devmonit.com",
      phone: "11923456789"
    });

    generateSecret = new GenerateSecret(
      serversRepository,
      secretsRepository
    );

    server = await registerServer.execute({
      accountId: account.id,
      name: "Server 1",
      description: "Description server 1",
      url: "https://sharbe.com.br"
    });
  });

  it("should be able to generate a secret for a server", async () => {
    const response = await generateSecret.execute({
      serverId: server.id
    });

    expect(response).toHaveProperty("id");
  });

  it("should not be able to generate a secret for a server that does not exist", async () => {
    await expect(generateSecret.execute({
      serverId: "1923129788071936"
    })).rejects.toEqual(new Error("Server does not exists."));
  });

  it("should not be able to generate a secret for a server that already has a secret", async () => {
    await generateSecret.execute({
      serverId: server.id
    });

    await expect(generateSecret.execute({
      serverId: server.id
    })).rejects.toEqual(new Error("Server already has a secret."));
  });
});
