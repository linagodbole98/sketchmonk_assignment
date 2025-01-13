import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Example query hook
export function useExample(id: string) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: async () => {
      const response = await fetch(`/api/example/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
}

// Example mutation hook
export function useExampleMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newData: any) => {
      const response = await fetch('/api/example', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalidate queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ['example'] })
    },
  })
}
