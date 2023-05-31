import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Login page', async () => {
  await setup()

  it('should render', async () => {
    const html = await $fetch('/login')
    expect(html).toContain('Login')
  })
})
