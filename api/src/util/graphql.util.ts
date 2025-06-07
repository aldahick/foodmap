import { Args, Context, Info, ResolveField, Root } from "@nestjs/graphql";
import { createBatchResolver } from "graphql-resolve-batch";

const batchParamDecorators = [Root, Args, Context, Info];
export const BatchResolveField =
  (propertyName?: string): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    if (typeof descriptor.value !== "function") {
      throw new Error(
        `Cannot BatchResolveField on a non-function ${
          target.constructor.name
        }.${propertyKey.toString()}, type ${typeof descriptor.value}`,
      );
    }
    const originalResolver = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown[]>;
    let _this: unknown;
    const batchResolver = createBatchResolver((...args) =>
      originalResolver.apply(_this, args),
    );
    descriptor.value = function (
      this: unknown,
      ...args: Parameters<typeof batchResolver>
    ) {
      _this = this;
      if (Array.isArray(args[0])) {
        return originalResolver.apply(this, args);
      }
      return batchResolver(...args);
    } as never;
    for (const [index, decorator] of batchParamDecorators.entries()) {
      decorator()(target, propertyKey, index);
    }
    return ResolveField(propertyName)(target, propertyKey, descriptor);
  };
