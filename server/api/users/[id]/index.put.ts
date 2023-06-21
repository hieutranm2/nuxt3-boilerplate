export default defineEventHandler(async (e) => {
  const { id } = e.context.params!
  const body = await readBody(e)
  return { data: { id, ...body } }
})
