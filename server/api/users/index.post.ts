export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  return { data: { ...body, id: '1' } }
})
