/* eslint-disable */
// this is an auto generated file. 
// Edit schema.graphql and run amplify push --y and this file will be auto overwritten.

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      trash
      location
      reported_from
      date
      image
      status
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trash
        location
        reported_from
        date
        image
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
