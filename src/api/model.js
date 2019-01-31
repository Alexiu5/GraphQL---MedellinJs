const humps = require('humps')

module.exports = pgPool =>{
    return {
        async getAllTrips (){
            try {
                const res = await pgPool.query(`select * from trips`)
                
                return humps.camelizeKeys(res.rows)
            } catch (error) {
                throw new Error(error)
            }
        },
        async getAllUsers (){
            try {
                const res = await pgPool.query(`select * from users`)
                
                return humps.camelizeKeys(res.rows)
            } catch (error) {
                throw new Error(error)
            }
        },
        async getTripById (id) {
            try {
                const res = await pgPool.query(`select * from trips where id = $1`, [id])
                
                return humps.camelizeKeys(res.rows[0])
            } catch (error) {
                throw new Error(error)
            }
        },
        async getTripsByUserId (id) {
            try {
                const res = await pgPool.query(`select * from trips where user_id = $1`, [id])
                
                return humps.camelizeKeys(res.rows[0])
            } catch (error) {
                throw new Error(error)
            }
        },
        async getUserByUsername (username) {
            try {
                const res = await pgPool.query(`select * from users where username = $1`, [username])
                
                return humps.camelizeKeys(res.rows)
            } catch (error) {
                throw new Error(error)
            }
        },
        async getUserById (id) {
            try {
                const res = await pgPool.query(`select * from users where id = $1`, [id])
                
                return humps.camelizeKeys(res.rows[0])
            } catch (error) {
                throw new Error(error)
            }
        },
        async getCommentsByTrips (tripId) {
            try {
                const res =  await pgPool.query(`select * from trip_comments where trip_id = $1`, [tripId])
                
                return humps.camelizeKeys(res.rows)
            } catch (error) {
                throw new Error(error)
            }
        },

        async createUser(username, fullName, language){
            try {
                const res =  await pgPool.query(`insert into users(username, full_name, laguage)
                    values ($1, $2, $3) returning *`, [username, fullName, language])
            } catch (error) {
                throw new Error(error)
            }
        },

        async createTrip(name, placeName, userId){
            try {
                const res =  await pgPool.query(`insert into users(name, place_name, user_id)
                    values ($1, $2, $3) returning *`, [name, placeName, userId])
            } catch (error) {
                throw new Error(error)
            }
        },
        async createComments(comment, tripId, userId){
            try {
                const res =  await pgPool.query(`insert into users(comment, trip_id, user_id)
                    values ($1, $2, $3) returning *`, [comment, tripId, userId])
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}