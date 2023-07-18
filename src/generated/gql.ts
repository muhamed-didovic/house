/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query EditHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      image\n      publicId\n      bedrooms\n      latitude\n      longitude\n    }\n  }\n": types.EditHouseQueryDocument,
    "\n  query ShowHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      publicId\n      bedrooms\n      latitude\n      longitude\n      nearby {\n        id\n        latitude\n        longitude\n      }\n    }\n  }\n": types.ShowHouseQueryDocument,
    "\n  query HousesQuery($bounds: BoundsInput!) {\n    houses(bounds: $bounds) {\n      id\n      latitude\n      longitude\n      address\n      publicId\n      bedrooms\n    }\n  }\n": types.HousesQueryDocument,
    "\n  mutation CreateSignatureMutation {\n    createImageSignature {\n      signature\n      timestamp\n    }\n  }\n": types.CreateSignatureMutationDocument,
    "\n  mutation CreateHouseMutation($input: HouseInput!) {\n    createHouse(input: $input) {\n      id\n    }\n  }\n": types.CreateHouseMutationDocument,
    "\n  mutation UpdateHouseMutation($id: String!, $input: HouseInput!) {\n    updateHouse(id: $id, input: $input) {\n      id\n      image\n      publicId\n      latitude\n      longitude\n      bedrooms\n      address\n    }\n  }\n": types.UpdateHouseMutationDocument,
    "\n  mutation DeleteHouse($id: String!) {\n    deleteHouse(id: $id)\n  }\n": types.DeleteHouseDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EditHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      image\n      publicId\n      bedrooms\n      latitude\n      longitude\n    }\n  }\n"): (typeof documents)["\n  query EditHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      image\n      publicId\n      bedrooms\n      latitude\n      longitude\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ShowHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      publicId\n      bedrooms\n      latitude\n      longitude\n      nearby {\n        id\n        latitude\n        longitude\n      }\n    }\n  }\n"): (typeof documents)["\n  query ShowHouseQuery($id: String!) {\n    house(id: $id) {\n      id\n      userId\n      address\n      publicId\n      bedrooms\n      latitude\n      longitude\n      nearby {\n        id\n        latitude\n        longitude\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HousesQuery($bounds: BoundsInput!) {\n    houses(bounds: $bounds) {\n      id\n      latitude\n      longitude\n      address\n      publicId\n      bedrooms\n    }\n  }\n"): (typeof documents)["\n  query HousesQuery($bounds: BoundsInput!) {\n    houses(bounds: $bounds) {\n      id\n      latitude\n      longitude\n      address\n      publicId\n      bedrooms\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSignatureMutation {\n    createImageSignature {\n      signature\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSignatureMutation {\n    createImageSignature {\n      signature\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateHouseMutation($input: HouseInput!) {\n    createHouse(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHouseMutation($input: HouseInput!) {\n    createHouse(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateHouseMutation($id: String!, $input: HouseInput!) {\n    updateHouse(id: $id, input: $input) {\n      id\n      image\n      publicId\n      latitude\n      longitude\n      bedrooms\n      address\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateHouseMutation($id: String!, $input: HouseInput!) {\n    updateHouse(id: $id, input: $input) {\n      id\n      image\n      publicId\n      latitude\n      longitude\n      bedrooms\n      address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteHouse($id: String!) {\n    deleteHouse(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteHouse($id: String!) {\n    deleteHouse(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;