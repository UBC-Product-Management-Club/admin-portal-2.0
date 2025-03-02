
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Event } from '@/lib/types';
import { mockEvents } from '@/lib/mock-data';

// Mock API functions
const fetchEvents = async (): Promise<Event[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEvents);
    }, 500);
  });
};

const fetchEventById = async (id: string): Promise<Event | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.event_Id === id);
      resolve(event);
    }, 300);
  });
};

const createEvent = async (event: Omit<Event, 'event_Id'>): Promise<Event> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent = {
        ...event,
        event_Id: `event-${Date.now()}`,
        isDisabled: false,
        media: event.media || []
      } as Event;
      resolve(newEvent);
    }, 500);
  });
};

const updateEvent = async (event: Event): Promise<Event> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(event);
    }, 500);
  });
};

const deleteEvent = async (id: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export function useEvents() {
  const queryClient = useQueryClient();

  // Get all events
  const {
    data: events = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  // Get a single event
  const getEvent = (id: string) => {
    return useQuery({
      queryKey: ['events', id],
      queryFn: () => fetchEventById(id),
      enabled: !!id
    });
  };

  // Create a new event
  const addEvent = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event successfully created');
    },
    onError: (error) => {
      console.error('Failed to create event:', error);
      toast.error('Failed to create event');
    }
  });

  // Update an event
  const editEvent = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event successfully updated');
    },
    onError: (error) => {
      console.error('Failed to update event:', error);
      toast.error('Failed to update event');
    }
  });

  // Delete an event
  const removeEvent = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event successfully deleted');
    },
    onError: (error) => {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event');
    }
  });

  return {
    events,
    isLoading,
    error,
    refetch,
    getEvent,
    createEvent: addEvent.mutate,
    updateEvent: editEvent.mutate,
    deleteEvent: removeEvent.mutate
  };
}
