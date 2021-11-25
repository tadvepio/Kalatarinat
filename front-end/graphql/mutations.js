import { gql } from '@apollo/client';

export const CREATE_ENTRY = gql `
mutation createEntry($date: String!, $time: String!, $location: String!, $temperature: String!, $weather: String!) {
    createEntry(
    date: $date,
    time: $time,
    location: $location,
    temperature: $temperature,
    weather: $weather
  ) {
    date,
    id
  }
}
`

export const MODIFY_ENTRY = gql `
mutation modifyEntry($id: ID!, $date: String!, $time: String!, $location: String!, $temperature: String!, $weather: String!) {
  modifyEntry(
  id: $id,
  date: $date,
  time: $time,
  location: $location,
  temperature: $temperature,
  weather: $weather
) {
  id
  }
}
`

export const DELETE_ENTRY = gql `
mutation deleteEntry($id: ID!) {
    deleteEntry(id: $id)
}
`