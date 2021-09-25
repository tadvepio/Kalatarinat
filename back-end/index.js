const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
//Key for decrypting tokens (use environmental variable)
const JWT_SECRET = ''
//Link for connecting to the database (use environmental variable)
const MONGODB_URI = ''
const jwt = require('jsonwebtoken')

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//Defines GraphQL datatypes (Users, FishingTrip etc.)
const typeDefs = gql`
  
`

//Defines Query/Mutation functions(getData, addFishingTrip etc.)
const resolvers = {
    
}

//Apollo server stuff
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //This is used for authorization token decrypting
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
})

//Starts the server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})