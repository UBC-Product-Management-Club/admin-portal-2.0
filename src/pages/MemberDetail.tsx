
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Mail, School, BookOpen, Check, X } from 'lucide-react';

import { useMembers } from '@/hooks/useMembers';
import { useEvents } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMember } = useMembers();
  const { events } = useEvents();
  const { data: member, isLoading, error } = getMember(id || '');

  useEffect(() => {
    if (error) {
      console.error('Error fetching member:', error);
    }
  }, [error]);

  const goBack = () => {
    navigate('/members');
  };

  const attendedEvents = events.filter(
    (event) => member?.events_attended.includes(event.event_Id)
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={goBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-lg" />
          <Skeleton className="h-[300px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader
          title="Member Not Found"
          subtitle="The requested member could not be found."
          actions={
            <Button variant="outline" onClick={goBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title={member.displayName}
        subtitle={`Member details for ${member.displayName}`}
        actions={
          <Button variant="outline" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">First Name</p>
                  <p className="text-sm text-muted-foreground">{member.first_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Name</p>
                  <p className="text-sm text-muted-foreground">{member.last_name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Pronouns</p>
                <p className="text-sm text-muted-foreground">{member.pronouns}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Joined Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.joined_date), 'MMMM d, yyyy')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={member.returning_member ? 'default' : 'outline'}>
                  {member.returning_member ? 'Returning Member' : 'New Member'}
                </Badge>
                <Badge variant={member.paymentVerified ? 'success' : 'destructive'}>
                  {member.paymentVerified ? 'Payment Verified' : 'Payment Pending'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">University</p>
                <p className="text-sm text-muted-foreground">{member.university}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Student ID</p>
                <p className="text-sm text-muted-foreground">{member.student_id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Year</p>
                  <p className="text-sm text-muted-foreground">{member.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Faculty</p>
                  <p className="text-sm text-muted-foreground">{member.faculty}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Major</p>
                <p className="text-sm text-muted-foreground">{member.major}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Why Interested in Product Management?</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{member.why_PM}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Events Attended ({attendedEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {attendedEvents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendedEvents.map((event) => (
                    <TableRow key={event.event_Id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>
                        {format(new Date(event.date), 'MMMM d, yyyy')}
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                This member has not attended any events yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDetail;
