const humps = require('humps')
const _ = require('lodash')

const orderedFor = (rows, collection, fields, singleObject) => {
  const data = humps.camelizeKeys(rows)
  const inGroupsOfFields = _.groupBy(data, fields)
  return collection.map(element => {
    const elementArray = inGroupsOfFields[element]
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray
    }
    return singleObject ? {} : []
  })
}

module.exports = { orderedFor }
