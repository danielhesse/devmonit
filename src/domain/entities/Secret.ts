import { Entity } from "../../core/domain/Entity";

type SecretProps = {
  serverId: string;
  access_key: string;
}

export class Secret extends Entity<SecretProps> {
  private constructor(props: SecretProps, id?: string) {
    super(props, id);
  }

  static create(props: SecretProps, id?: string) {
    const secret = new Secret(props, id);

    return secret;
  }
}
