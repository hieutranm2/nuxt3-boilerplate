export default defineEventHandler(async (e) => {
  const { id } = e.context.params!
  return { data: { userId: id, count: 1 } }
})
