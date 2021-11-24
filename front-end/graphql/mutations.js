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
    date
  }
}
`