import joinIncludes from '../index.js'
import { pointer, data } from '../test-utils.js'

const siteAPointer = pointer('Site', 'a')
const userAPointer = pointer('User', 'a')

const siteAData = data(siteAPointer, {name: 'Site A'}, {
  parent: {data: siteAPointer},
  owner: {data: userAPointer},
})
// const userAData = data(userAPointer, {name: 'User A'}, {})

test('self referential models also have recursion protection', () => {
  const data = [
    siteAData,
  ]
  const included = []
  expect(joinIncludes(data, included)).toStrictEqual([
    {
      ...siteAData,
      relationships: {
        ...siteAData.relationships,
        parent: {
          data: siteAPointer,
        },
      },
    }
  ])
})
