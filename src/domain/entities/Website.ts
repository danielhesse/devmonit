import { Entity } from "../../core/domain/Entity";

type WebsiteProps = {
  accountId: string;
  name: string;
  description: string;
  url: string;
}

export class Website extends Entity<WebsiteProps> {
  private constructor(props: WebsiteProps, id?: string) {
    super(props, id);
  }

  static create(props: WebsiteProps, id?: string) {
    const website = new Website(props, id);

    return website;
  }
}
