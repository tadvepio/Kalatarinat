import { gql } from '@apollo/client';

export const ALL_ENTRIES = gql`
  query {
    allEntries  {
        date,
        time,
        location,
        temperature,
        weather
    }
  }
`