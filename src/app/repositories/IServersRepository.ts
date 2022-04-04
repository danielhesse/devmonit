import { Server } from "../../domain/entities/Server";
import { RegisterServerDto } from "../dtos/RegisterServerDto";

export interface IServersRepository {
  create(data: RegisterServerDto): Server;
  findById(id: string): Server | null;
  findByName(name: string): Server | null;
}
