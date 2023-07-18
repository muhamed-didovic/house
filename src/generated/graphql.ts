/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BoundsInput = {
  ne: CoordinatesInput;
  sw: CoordinatesInput;
};

export type CoordinatesInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type House = {
  __typename?: 'House';
  address: Scalars['String']['output'];
  bedrooms: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  nearby: Array<House>;
  publicId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type HouseInput = {
  address: Scalars['String']['input'];
  bedrooms: Scalars['Int']['input'];
  coordinates: CoordinatesInput;
  image: Scalars['String']['input'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHouse?: Maybe<House>;
  createImageSignature: ImageSignature;
  deleteHouse: Scalars['Boolean']['output'];
  updateHouse?: Maybe<House>;
};


export type MutationCreateHouseArgs = {
  input: HouseInput;
};


export type MutationDeleteHouseArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateHouseArgs = {
  id: Scalars['String']['input'];
  input: HouseInput;
};

export type Query = {
  __typename?: 'Query';
  house?: Maybe<House>;
  houses: Array<House>;
};


export type QueryHouseArgs = {
  id: Scalars['String']['input'];
};


export type QueryHousesArgs = {
  bounds: BoundsInput;
};

export type EditHouseQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EditHouseQueryQuery = { __typename?: 'Query', house?: { __typename?: 'House', id: string, userId: string, address: string, image: string, publicId: string, bedrooms: number, latitude: number, longitude: number } | null };

export type ShowHouseQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ShowHouseQueryQuery = { __typename?: 'Query', house?: { __typename?: 'House', id: string, userId: string, address: string, publicId: string, bedrooms: number, latitude: number, longitude: number, nearby: Array<{ __typename?: 'House', id: string, latitude: number, longitude: number }> } | null };

export type HousesQueryQueryVariables = Exact<{
  bounds: BoundsInput;
}>;


export type HousesQueryQuery = { __typename?: 'Query', houses: Array<{ __typename?: 'House', id: string, latitude: number, longitude: number, address: string, publicId: string, bedrooms: number }> };

export type CreateSignatureMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignatureMutationMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type CreateHouseMutationMutationVariables = Exact<{
  input: HouseInput;
}>;


export type CreateHouseMutationMutation = { __typename?: 'Mutation', createHouse?: { __typename?: 'House', id: string } | null };

export type UpdateHouseMutationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: HouseInput;
}>;


export type UpdateHouseMutationMutation = { __typename?: 'Mutation', updateHouse?: { __typename?: 'House', id: string, image: string, publicId: string, latitude: number, longitude: number, bedrooms: number, address: string } | null };

export type DeleteHouseMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteHouseMutation = { __typename?: 'Mutation', deleteHouse: boolean };


export const EditHouseQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditHouseQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"house"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]} as unknown as DocumentNode<EditHouseQueryQuery, EditHouseQueryQueryVariables>;
export const ShowHouseQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ShowHouseQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"house"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"nearby"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]} as unknown as DocumentNode<ShowHouseQueryQuery, ShowHouseQueryQueryVariables>;
export const HousesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HousesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bounds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BoundsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"houses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bounds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}}]}}]}}]} as unknown as DocumentNode<HousesQueryQuery, HousesQueryQueryVariables>;
export const CreateSignatureMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSignatureMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createImageSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<CreateSignatureMutationMutation, CreateSignatureMutationMutationVariables>;
export const CreateHouseMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHouseMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateHouseMutationMutation, CreateHouseMutationMutationVariables>;
export const UpdateHouseMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHouseMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<UpdateHouseMutationMutation, UpdateHouseMutationMutationVariables>;
export const DeleteHouseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHouse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteHouseMutation, DeleteHouseMutationVariables>;