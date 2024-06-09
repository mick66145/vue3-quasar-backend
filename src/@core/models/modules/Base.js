import { randomHashKey } from '@/utils'

const Base = {
  hashKey: randomHashKey(['up_en', 'low_en', 'num'], 40)
}

const BaseFactory = () => (
  {
    ...Base,
  }
)

export default BaseFactory
