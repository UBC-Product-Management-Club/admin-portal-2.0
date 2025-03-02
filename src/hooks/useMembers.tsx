
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Member } from '@/lib/types';
import { mockMembers } from '@/lib/mock-data';

// Mock API functions
const fetchMembers = async (): Promise<Member[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMembers);
    }, 500);
  });
};

const fetchMemberById = async (id: string): Promise<Member | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const member = mockMembers.find(m => m.id === id);
      resolve(member);
    }, 300);
  });
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
    data: members = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers
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
