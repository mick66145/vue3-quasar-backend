import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob('./*.js', {
  import: 'default',
  eager: true,
})

const mockModules = []
Object.keys(modules).forEach(async (key) => {
  if (key.includes('_')) {
    return
  }
  mockModules.push(...modules[key])
})

export function setupProdMockServer () {
  createProdMockServer(mockModules)
}
