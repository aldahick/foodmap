import { type CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, type ValueNode } from "graphql";

@Scalar("Date")
export class DateScalar implements CustomScalar<string, Date> {
  parseLiteral(node: ValueNode) {
    if (node.kind !== Kind.STRING) {
      throw new Error(`Cannot parse ${node.kind} as date`);
    }
    return new Date(node.value);
  }

  parseValue(value: unknown) {
    if (typeof value !== "string") {
      throw new Error(`Cannot parse ${typeof value} as date`);
    }
    return new Date(value);
  }

  serialize(value: unknown) {
    if (!(value instanceof Date)) {
      throw new Error(`Cannot serialize ${typeof value} as date`);
    }
    return value.toISOString();
  }
}
