import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Index page', async () => {
  await setup()

  it('should render', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Home')
  })
})
