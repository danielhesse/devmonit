import md5 from "md5";
import { v4 as uuid } from "uuid";
import { ISecretsRepository } from "../../repositories/ISecretsRepository";
import { IServersRepository } from "../../repositories/IServersRepository";

type GenerateSecretRequest = {
  serverId: string;
}

export class GenerateSecret {
  constructor(
    private serversRepository: IServersRepository,
    private secretsRepository: ISecretsRepository,
  ) { }

  async execute({ serverId }: GenerateSecretRequest) {
    const serverExists = this.serversRepository.findById(serverId);

    if (!serverExists) {
      throw new Error("Server does not exists.");
    }

    const secretExists = this.secretsRepository.findByServerId(serverId);

    if (secretExists) {
      throw new Error("Server already has a secret.")
    }

    const access_key = md5(uuid());

    const secret = this.secretsRepository.create({
      serverId,
      access_key,
    });

    return secret;
  }
}
