
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { EventForm } from '@/lib/types';
import { mockEventForms } from '@/lib/mock-data';

// Mock API functions
const fetchEventForms = async (): Promise<EventForm[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEventForms);
    }, 500);
  });
};

const fetchEventFormById = async (id: string): Promise<EventForm | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const form = mockEventForms.find(f => f.id === id);
      resolve(form);
    }, 300);
  });
};

const createEventForm = async (form: Omit<EventForm, 'id'>): Promise<EventForm> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newForm = {
        ...form,
        id: `form-${Date.now()}`
      } as EventForm;
      resolve(newForm);
    }, 500);
  });
};

const updateEventForm = async (form: EventForm): Promise<EventForm> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(form);
    }, 500);
  });
};

const deleteEventForm = async (id: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export function useEventForms() {
  const queryClient = useQueryClient();

  // Get all event forms
  const {
    data: eventForms = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['eventForms'],
    queryFn: fetchEventForms
  });

  // Get a single event form
  const getEventForm = (id: string) => {
    return useQuery({
      queryKey: ['eventForms', id],
      queryFn: () => fetchEventFormById(id),
      enabled: !!id
    });
  };

  // Create a new event form
  const addEventForm = useMutation({
    mutationFn: createEventForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventForms'] });
      toast.success('Event form successfully created');
    },
    onError: (error) => {
      console.error('Failed to create event form:', error);
      toast.error('Failed to create event form');
    }
  });

  // Update an event form
  const editEventForm = useMutation({
    mutationFn: updateEventForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventForms'] });
      toast.success('Event form successfully updated');
    },
    onError: (error) => {
      console.error('Failed to update event form:', error);
      toast.error('Failed to update event form');
    }
  });

  // Delete an event form
  const removeEventForm = useMutation({
    mutationFn: deleteEventForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventForms'] });
      toast.success('Event form successfully deleted');
    },
    onError: (error) => {
      console.error('Failed to delete event form:', error);
      toast.error('Failed to delete event form');
    }
  });

  return {
    eventForms,
    isLoading,
    error,
    refetch,
    getEventForm,
    createEventForm: addEventForm.mutate,
    updateEventForm: editEventForm.mutate,
    deleteEventForm: removeEventForm.mutate
  };
}
