import joinIncludes from '../index.js'
import { pointer, data } from '../test-utils.js'

const siteAPointer = pointer('Site', 'a')
const userAPointer = pointer('User', 'a')

const siteAData = data(siteAPointer, {attributes: 'Site A'}, {owner: {data: userAPointer}})
const userAData = data(userAPointer, {attributes: 'User A'}, {sites: {data: [siteAPointer]}})

test('recursion stops itself when it sees a model it has already included', () => {
  const data = [
    siteAData,
  ]
  const included = [
    userAData,
  ]
  expect(joinIncludes(data, included)).toStrictEqual([
    {
      ...siteAData,
      relationships: {
        ...siteAData.relationships,
        owner: {
          data: userAData,
        },
      },
    }
  ])
})
