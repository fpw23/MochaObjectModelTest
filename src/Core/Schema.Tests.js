/* global describe it */
/* eslint-disable no-unused-expressions */
import { StringNotBlank, Str } from 'common-core/Schema'
import { expect } from 'common-helpers/TestHelper'
import { BasicModel, ObjectModel } from 'objectModel'

const StringNotEmpty = BasicModel(String).assert(function isNotBlank (str) { return str.trim().length > 0 }).as('StringNotEmpty')

describe.only('Core', function () {
  describe('Schema Build', function () {
    it('Should not let extra values that are passed in', function () {
      let localtest = StringNotEmpty('homer')
      let importtest = StringNotBlank('homer')

      console.log('Local:', localtest)
      console.log('Import:', importtest)

      console.log('Local Func:', StringNotEmpty.definition)
      console.log('Import Func:', StringNotBlank.definition)

      const UserInfo = new ObjectModel({
        Id: Number,
        FirstName: StringNotEmpty,
        LastName: StringNotBlank,
        Email: BasicModel(String).assert(function isNotBlank (str) { return str.trim().length > 0 }).as('StringNotEmpty')
      })

      let userData = {
        Id: 12,
        FirstName: 'asdfasd',
        LastName: 'test',
        //comment above and uncomment below and test will pass
        // LastName: StringNotBlank,  
        Email: 'test'
      }

      const user = new UserInfo(userData)

      expect(user, JSON.stringify(user)).to.not.be.null
      expect(user, JSON.stringify(user)).to.not.have.property('Permissions')
    })
  })
})
