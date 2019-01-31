'use-strict'

// Here is where we resolve the resolvers :T

const trips = (obj, args, ctx) => {
    return model(ctx.pgPool).getAllTrips()
}

const tripById = (obj, args, ctx) => {
    let {tripId} = args
    
    tripId = parseInt(tripId)
    return model(ctx.pgPool).getTripById(tripId)
}

const users = (obj, args, ctx) => {
    return model(ctx.pgPool).getAllUsers()
}

const userByUsername = (obj, args, ctx) => {
    const {username} = args
    return model(ctx.pgPool).getUserByUsername(username)

}

const createUser = (obj, { input }, ctx) => {
    const {username, fullName, language} = input

    return model(ctx.pgPool).createUser({username, fullName, language})
}

const createTrip = (obj,  { input }, ctx) => {
    let {name, placename, userId} = input
    userId = parseInt(userId)

    return model(ctx.pgPool).createTrip({name, placename, userId})

}

const createComment = (obj,  { input }, ctx) => {
    let {comment, tripId, userId} = input
    tripId = parseInt(tripId)
    userId = parseInt(userId)
    model(ctx.pgPool).createComment({comment, tripId, userId})

    return  model(ctx.pgPool).getTripById(tripId)

}


module.exports = {
    Query: {
        trips,
        tripById,
        users,
        userByUsername
    },
    Mutation: {
        createUser,
        createTrip,
        createComment
    },
    User: {
        trips: (obj, args, ctx) => {
            return model(ctx.pgPool).getTripsByUserId(obj.userId)
        }
    },
    Trip:{
        user:(trip, args, ctx) => {
            return model(pgPool).getTripsByUserId(trip.userId)
        },
        comments: (trip, args, ctx) =>{
             return model(ctx.pgPool).getCommmentByTripId(trip.id)
        }
    },
    Comment:{
        user:(obj, args, ctx) => {
            return model(pgPool).getUserById(obj.userId)
        }
    }
}