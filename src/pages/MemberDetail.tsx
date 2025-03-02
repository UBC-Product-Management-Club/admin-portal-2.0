
import { useParams, useNavigate } from 'react-router-dom';
import { useMembers } from '@/hooks/useMembers';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMember, deleteMember } = useMembers();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { data: member, isLoading, error } = getMember(id || '');

  const handleDelete = () => {
    if (id) {
      deleteMember(id);
      navigate('/members');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/members')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading member details...</h1>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/members')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Member not found</h1>
        </div>
        <p className="mt-4 text-muted-foreground">
          The member you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-4" onClick={() => navigate('/members')}>
          Back to Members
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title={`${member.first_name} ${member.last_name}`}
        subtitle={member.email}
        backButton={{
          label: 'Back to Members',
          onClick: () => navigate('/members')
        }}
        actions={
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Member
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the member
                  and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Basic member information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Display Name</p>
              <p>{member.displayName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pronouns</p>
              <p>{member.pronouns}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{member.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
              <Badge variant={member.paymentVerified ? "default" : "destructive"}>
                {member.paymentVerified ? 'Verified' : 'Pending'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>University and program details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">University</p>
              <p>{member.university}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Student ID</p>
              <p>{member.student_id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Year</p>
              <p>{member.year}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Faculty</p>
              <p>{member.faculty}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Major</p>
              <p>{member.major}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Membership Information</CardTitle>
            <CardDescription>Details about their membership</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Returning Member</p>
              <Badge variant={member.returning_member ? "default" : "outline"}>
                {member.returning_member ? 'Returning Member' : 'New Member'}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Why PM?</p>
              <p className="whitespace-pre-line">{member.why_PM}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDetail;
