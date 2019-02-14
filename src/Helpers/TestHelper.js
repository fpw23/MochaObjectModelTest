/* eslint-disable no-unused-expressions */
import chai from 'chai'
import _ from 'lodash'

chai.config.showDiff = false
chai.config.includeStack = false

export const expect = chai.expect

export const Show = (message) => {
  let ret = `\r\n`
  ret = ret + `\tMessage: ${message}\r\n`
  return ret
}

export const ShowMessages = (messages) => {
  let ret = `\r\n`
  ret = ret + `\tMessages:\r\n`
  _.forEach(messages, (m, i) => {
    ret = ret + `\t\tMessage ${i + 1}(${m.Type}): ${m.Message} - Field:${m.Field || 'none'}\r\n`
  })
  return ret
}

export const ContainsMessageWithText = (message, messages) => {
  let match = _.find(messages, (m) => {
    return _.includes(m.Message, message)
  })
  expect(match, Show(`No messages contain the text '${message}'`)).to.not.be.undefined
}
