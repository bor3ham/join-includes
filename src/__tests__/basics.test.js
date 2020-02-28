import joinIncludes from '../index.js'
import { pointer, data } from '../test-utils.js'

const siteAPointer = pointer('Site', 'a')
const userAPointer = pointer('User', 'a')
const taskAPointer = pointer('Task', 'a')
const projectAPointer = pointer('Project', 'a')

const siteAData = data(siteAPointer, {name: 'Site A'}, {owner: {data: userAPointer}})
const userAData = data(userAPointer, {name: 'User A'}, {tasks: {data: [taskAPointer]}})
const taskAData = data(taskAPointer, {name: 'Task A'}, {project: {data: projectAPointer}})
const projectAData = data(projectAPointer, {name: 'Project A'}, {})

test('can join single item', () => {
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

test('can join set of items', () => {
  const data = [
    userAData,
  ]
  const included = [
    taskAData,
  ]
  expect(joinIncludes(data, included)).toStrictEqual([
    {
      ...userAData,
      relationships: {
        ...userAData.relationships,
        tasks: {
          data: [
            taskAData,
          ],
        },
      },
    }
  ])
})

test('multiple levels of included relations can be filled', () => {
  const data = [
    userAData,
  ]
  const included = [
    taskAData,
    projectAData
  ]
  expect(joinIncludes(data, included)).toStrictEqual([
    {
      ...userAData,
      relationships: {
        ...userAData.relationships,
        tasks: {
          data: [
            {
              ...taskAData,
              relationships: {
                project: {
                  data: projectAData,
                },
              },
            },
          ],
        },
      },
    }
  ])
})
