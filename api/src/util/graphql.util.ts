import { Args, Context, Info, ResolveField, Root } from "@nestjs/graphql";
import {
  Mutation as MutationDecorator,
  Query as QueryDecorator,
} from "@nestjs/graphql";
import { createBatchResolver } from "graphql-resolve-batch";
import type { IMutation, IQuery } from "../graphql.js";

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

export const TypedQuery =
  <Name extends keyof IQuery, Parameters extends unknown[]>(name: Name) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<
      (...args: Parameters) => Promise<IQuery[Name]>
    >,
  ) =>
    QueryDecorator(name)(target, propertyKey, descriptor);

export const TypedMutation =
  <Name extends keyof IMutation, Parameters extends unknown[]>(name: Name) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<
      (...args: Parameters) => Promise<IMutation[Name]>
    >,
  ) =>
    MutationDecorator(name)(target, propertyKey, descriptor);
