export const useUserRepository = () => {
  const getAll = () => useFetch('/api/users', { method: 'GET' })
  const get = (id: string) => useFetch(`/api/users/${id}`, { method: 'GET' })
  const getCart = (id: string) => useFetch(`/api/users/${id}/cart`, { method: 'GET' })
  const create = (data: any) => $fetch<{ data: any }>('/api/users', { method: 'POST', body: data })
  const update = (id: string, data: any) => {
    return $fetch<{ data: any }>(`/api/users/${id}`, { method: 'PUT', body: data })
  }
  const remove = (id: string) => $fetch<{ data: any }>(`/api/users/${id}`, { method: 'DELETE' })

  return {
    getAll,
    get,
    getCart,
    create,
    update,
    remove,
  }
}
