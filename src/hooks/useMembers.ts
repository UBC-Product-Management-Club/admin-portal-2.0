import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Member } from '@/lib/types';

// Mock API functions
const fetchAllMembers = async (): Promise<Member[]> => {
  // Simulate API call
  const url = `${import.meta.env.VITE_API_URL}/v1/admin/users`
  const req = await fetch(url)
  if (req.ok) {
    const res = await req.json()
    return res
  } else {
    return [] 
  }
};

const fetchMemberById = async (id: string): Promise<Member | undefined> => {
  // Simulate API call
  const url = `${import.meta.env.VITE_API_URL}/v1/admin/users/${id}`
  const req = await(fetch(url))
  if (req.ok) {
    const res = await req.json()
    return res
  } 
  return undefined
};

const deleteMember = async (id: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would delete from database
      resolve(true);
    }, 500);
  });
};

export function useMembers() {
  const queryClient = useQueryClient();

  // Get all members
  const {
    data:  members = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['members'],
    queryFn: fetchAllMembers
  });

  // Get a single member
  const getMember = (id: string) => {
    return useQuery({
      queryKey: ['members', id],
      queryFn: () => fetchMemberById(id),
      enabled: !!id
    });
  };

  // Delete a member
  const removeMember = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success('Member successfully deleted');
    },
    onError: (error) => {
      console.error('Failed to delete member:', error);
      toast.error('Failed to delete member');
    }
  });

  return {
    members,
    isLoading,
    error,
    refetch,
    getMember,
    deleteMember: removeMember.mutate
  };
}
