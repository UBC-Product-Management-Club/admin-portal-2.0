
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, CalendarIcon, FileTextIcon, UsersIcon } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import { useEvents } from "@/hooks/useEvents";
import { useEventForms } from "@/hooks/useEventForms";
import { PageHeader } from "@/components/shared/PageHeader";

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  description: string; 
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const { members = [], isLoading: isMembersLoading } = useMembers();
  const { events = [], isLoading: isEventsLoading } = useEvents();
  const { eventForms = [], isLoading: isFormsLoading } = useEventForms();

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to the Membership Admin Portal"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Members"
          value={isMembersLoading ? "Loading..." : members.length}
          description="Active members in the organization"
          icon={UserIcon}
        />
        <DashboardCard
          title="Events"
          value={isEventsLoading ? "Loading..." : events.length}
          description="Upcoming and past events"
          icon={CalendarIcon}
        />
        <DashboardCard
          title="Event Forms"
          value={isFormsLoading ? "Loading..." : eventForms.length}
          description="Registration forms created"
          icon={FileTextIcon}
        />
        <DashboardCard
          title="Member Retention"
          value="87%"
          description="Members who have renewed"
          icon={UsersIcon}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Events scheduled in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {isEventsLoading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-muted-foreground">No upcoming events</p>
            ) : (
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div key={event.event_Id} className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date} - {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
            <CardDescription>Latest members to join</CardDescription>
          </CardHeader>
          <CardContent>
            {isMembersLoading ? (
              <p>Loading members...</p>
            ) : members.length === 0 ? (
              <p className="text-muted-foreground">No members found</p>
            ) : (
              <div className="space-y-4">
                {members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{member.first_name} {member.last_name}</p>
                      <p className="text-xs text-muted-foreground">{member.university} - {member.major}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
