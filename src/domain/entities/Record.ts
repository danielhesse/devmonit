import { Entity } from "../../core/domain/Entity";

type RecordProps = {
  serverId: string;
  error: string;
}

export class Record extends Entity<RecordProps> {
  private constructor(props: RecordProps, id?: string) {
    super(props, id);
  }

  static create(props: RecordProps, id?: string) {
    const record = new Record(props, id);

    return record;
  }
}
