import { IServersRepository } from "../../repositories/IServersRepository";
import axios from "axios";

type RegisterServerRequest = {
  accountId: string;
  name: string;
  description: string;
  url?: string;
}

export class RegisterServer {
  constructor(
    private serversRepository: IServersRepository,
  ) { }

  async execute({ accountId, name, description, url }: RegisterServerRequest) {
    const serverExists = this.serversRepository.findByName(name);

    if (serverExists && serverExists.props.accountId === accountId) {
      throw new Error("Server already exists.");
    }

    const server = this.serversRepository.create({
      accountId,
      name,
      description,
      url
    });

    return server;
  }
}
