import { Secret } from "../../domain/entities/Secret";
import { CreateSecretDto } from "../dtos/CreateSecretDto";

export interface ISecretsRepository {
  create(data: CreateSecretDto): Secret;
  findByServerId(serverId: string): Secret | null;
}
