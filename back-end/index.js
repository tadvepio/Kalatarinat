const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
//Key for decrypting tokens (use environmental variable)
const JWT_SECRET = process.env.JWT_SECRET
//Link for connecting to the database (use environmental variable)
const MONGODB_URI = process.env.MONGODB_URI
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Entry = require('./models/entry')


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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Entry {
    date: String!
    time: String!
    location: String!
    temperature: String!
    weather: String!
    id: ID!
  }
  type Query {
      me: User
      allEntries(date: String): [Entry]!
  }
  type Mutation {
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    createEntry(
      date: String!
      time: String!
      location: String!
      temperature: String!
      weather: String! 
    ): Entry
    deleteEntry(
      id: ID!
    ): Boolean!
    modifyEntry(
      id: ID!
      date: String!
      time: String!
      location: String!
      temperature: String!
      weather: String!
    ): Entry
  } 
`

//Defines Query/Mutation functions(getData, addFishingTrip etc.)
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    allEntries: (root, args) => {
      if (args.date) {
        console.log(args.date)
        return Entry.find({ date: args.date }).exec()
      }
      return Entry.find({}).exec()
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    createEntry: (root, args) => {
      const entry = new Entry({ 
        date: args.date,
        time: args.time,
        location: args.location,
        temperature: args.temperature,
        weather: args.weather
      })

      return entry.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    deleteEntry: async (root, args) => {
      console.log(args.id)
      await Entry.findByIdAndRemove(args.id);
      return true
    },
    modifyEntry: async (root, args) => {
      console.log(args.id)
      await Entry.findByIdAndUpdate(args.id, { 
        date: args.date,
        time: args.time,
        location: args.location,
        temperature: args.temperature,
        weather: args.weather 
      })
      return { id: args.id }
    }
  } 
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