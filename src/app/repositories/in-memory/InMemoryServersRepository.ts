import { Server } from "../../../domain/entities/Server";
import { RegisterServerDto } from "../../dtos/RegisterServerDto";
import { IServersRepository } from "../IServersRepository";

export class InMemoryServersRepository implements IServersRepository {
  constructor(private repository: Server[] = []) { }

  create(data: RegisterServerDto): Server {
    const server = Server.create(data);

    this.repository.push(server);

    return server;
  }

  findById(id: string): Server | null {
    const server = this.repository.find(server => server.id === id);

    if (!server) return null;

    return server;
  }

  findByName(name: string): Server | null {
    const server = this.repository.find(server => server.props.name === name);

    if (!server) return null;

    return server;
  }
}
