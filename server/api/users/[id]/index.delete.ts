export default defineEventHandler(async (e) => {
  const { id } = e.context.params!
  return { data: { id } }
})
