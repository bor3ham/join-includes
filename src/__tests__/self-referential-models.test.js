import joinIncludes from '../index.js'
import { pointer, data } from '../test-utils.js'

const siteAPointer = pointer('Site', 'a')
const siteBPointer = pointer('Site', 'b')

test('self referential models are exempt from recursion protection', () => {

})
