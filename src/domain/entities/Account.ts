import { Entity } from "../../core/domain/Entity";

type AccountProps = {
  name: string;
  email: string;
  phone: string;
}

export class Account extends Entity<AccountProps> {
  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  static create(props: AccountProps, id?: string) {
    const account = new Account(props, id);

    return account;
  }
}
