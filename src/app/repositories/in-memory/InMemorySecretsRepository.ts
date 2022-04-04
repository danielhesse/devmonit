import { Secret } from "../../../domain/entities/Secret";
import { CreateSecretDto } from "../../dtos/CreateSecretDto";
import { ISecretsRepository } from "../ISecretsRepository";

export class InMemorySecretsRepository implements ISecretsRepository {
  constructor(private repository: Secret[] = []) { }

  create(data: CreateSecretDto): Secret {
    const secret = Secret.create(data);

    this.repository.push(secret);

    return secret;
  }

  findByServerId(serverId: string): Secret | null {
    const secret =
      this.repository.find(secret => secret.props.serverId === serverId);

    if (!secret) return null;

    return secret;
  }
}
