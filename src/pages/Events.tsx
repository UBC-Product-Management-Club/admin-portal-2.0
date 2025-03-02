
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarX, Edit, Plus, Trash2 } from 'lucide-react';

import { useEvents } from '@/hooks/useEvents';
import { useEventForms } from '@/hooks/useEventForms';
import { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Events = () => {
  const { events, isLoading, createEvent, updateEvent, deleteEvent } = useEvents();
  const { eventForms } = useEventForms();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  
  const [formData, setFormData] = useState<Omit<Event, 'event_Id'>>({
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    description: '',
    media: [],
    member_price: '',
    non_member_price: '',
    attendee_Ids: [],
    member_only: false,
    maxAttendee: 0,
    eventFormId: undefined,
    isDisabled: false
  });

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      start_time: '',
      end_time: '',
      location: '',
      description: '',
      media: [],
      member_price: '',
      non_member_price: '',
      attendee_Ids: [],
      member_only: false,
      maxAttendee: 0,
      eventFormId: undefined,
      isDisabled: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = () => {
    createEvent(formData);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditClick = (event: Event) => {
    setEventToEdit(event);
    setFormData({
      name: event.name,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
      description: event.description,
      media: event.media || [],
      member_price: event.member_price,
      non_member_price: event.non_member_price,
      attendee_Ids: event.attendee_Ids || [],
      member_only: typeof event.member_only === 'boolean' ? event.member_only : event.member_only === 'true',
      maxAttendee: event.maxAttendee,
      eventFormId: event.eventFormId,
      isDisabled: event.isDisabled
    });
    setIsEditOpen(true);
  };

  const handleUpdateEvent = () => {
    if (eventToEdit) {
      updateEvent({ ...formData, event_Id: eventToEdit.event_Id });
    }
    setIsEditOpen(false);
    setEventToEdit(null);
    resetForm();
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete);
      setEventToDelete(null);
    }
  };

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: 'name',
      header: 'Event Name',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => format(new Date(row.original.date), 'MMM d, yyyy'),
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'member_only',
      header: 'Type',
      cell: ({ row }) => {
        const memberOnly = typeof row.original.member_only === 'boolean' 
          ? row.original.member_only 
          : row.original.member_only === 'true';
        return (
          <Badge variant={memberOnly ? 'secondary' : 'outline'}>
            {memberOnly ? 'Members Only' : 'Public'}
          </Badge>
        );
      },
    },
    {
      id: 'attendees',
      header: 'Attendees',
      cell: ({ row }) => {
        const attendees = Array.isArray(row.original.attendee_Ids) 
          ? row.original.attendee_Ids.length 
          : 0;
        const max = row.original.maxAttendee;
        return `${attendees}/${max}`;
      },
    },
    {
      accessorKey: 'isDisabled',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isDisabled ? 'destructive' : 'default'}>
          {row.original.isDisabled ? 'Disabled' : 'Active'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(event)}
              title="Edit event"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setEventToDelete(event.event_Id)}
                  title="Delete event"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Event</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this event? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setEventToDelete(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteEvent}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const EventForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter event name"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            name="start_time"
            type="time"
            value={formData.start_time.replace('T', '')}
            onChange={(e) => handleInputChange({
              ...e,
              target: { ...e.target, value: `T${e.target.value}`, name: 'start_time' }
            })}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            name="end_time"
            type="time"
            value={formData.end_time.replace('T', '')}
            onChange={(e) => handleInputChange({
              ...e,
              target: { ...e.target, value: `T${e.target.value}`, name: 'end_time' }
            })}
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter event description"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="member_price">Member Price</Label>
          <Input
            id="member_price"
            name="member_price"
            type="number"
            value={formData.member_price.toString()}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="non_member_price">Non-Member Price</Label>
          <Input
            id="non_member_price"
            name="non_member_price"
            type="number"
            value={formData.non_member_price.toString()}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="maxAttendee">Maximum Attendees</Label>
        <Input
          id="maxAttendee"
          name="maxAttendee"
          type="number"
          value={formData.maxAttendee}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="eventFormId">Registration Form</Label>
        <Select 
          value={formData.eventFormId} 
          onValueChange={(value) => handleSelectChange(value, 'eventFormId')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a form" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {eventForms.map((form) => (
              <SelectItem key={form.id} value={form.id}>
                {form.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Switch
          id="member_only"
          checked={
            typeof formData.member_only === 'boolean'
              ? formData.member_only
              : formData.member_only === 'true'
          }
          onCheckedChange={(checked) => handleSwitchChange(checked, 'member_only')}
        />
        <Label htmlFor="member_only">Members Only Event</Label>
      </div>
      
      {isEditOpen && (
        <div className="flex items-center gap-2">
          <Switch
            id="isDisabled"
            checked={formData.isDisabled}
            onCheckedChange={(checked) => handleSwitchChange(checked, 'isDisabled')}
          />
          <Label htmlFor="isDisabled">Disable Event</Label>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Events"
        subtitle="Manage upcoming and past events"
        actions={
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new event.
                </DialogDescription>
              </DialogHeader>
              
              <EventForm />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreateOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Edit Event Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to the event details.
            </DialogDescription>
          </DialogHeader>
          
          <EventForm />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditOpen(false);
                setEventToEdit(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={events}
          searchColumn="name"
          searchPlaceholder="Search events..."
          emptyState={{
            title: 'No events found',
            description: 'There are no events in the system or none match your search.',
            icon: <CalendarX className="h-10 w-10 text-muted-foreground/40" />,
            action: (
              <Button 
                onClick={() => setIsCreateOpen(true)}
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            )
          }}
        />
      </div>
    </div>
  );
};

export default Events;
