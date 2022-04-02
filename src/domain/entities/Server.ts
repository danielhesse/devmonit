import { Entity } from "../../core/domain/Entity";

type ServerProps = {
  userId: string;
  name: string;
  description: string;
  url: string;
}

export class Server extends Entity<ServerProps> {
  private constructor(props: ServerProps, id?: string) {
    super(props, id);
  }

  static create(props: ServerProps, id?: string) {
    const server = new Server(props, id);

    return server;
  }
}
