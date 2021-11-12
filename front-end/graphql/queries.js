import { gql } from '@apollo/client';

export const ALL_ENTRIES = gql`
  query {
    allEntries  {
        date,
        startTime,
        endTime,
        weather
    }
  }
`