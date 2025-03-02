
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2, UserX } from 'lucide-react';
import { toast } from 'sonner';

import { useMembers } from '@/hooks/useMembers';
import { Member } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { PageHeader } from '@/components/shared/PageHeader';
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
import { Badge } from '@/components/ui/badge';

const Members = () => {
  const { members, isLoading, deleteMember } = useMembers();
  const navigate = useNavigate();
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleViewMember = (id: string) => {
    navigate(`/members/${id}`);
  };

  const handleDeleteMember = async () => {
    if (memberToDelete) {
      try {
        await deleteMember(memberToDelete);
        setMemberToDelete(null);
      } catch (error) {
        console.error('Error deleting member:', error);
        toast.error('Failed to delete member');
      }
    }
  };

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: 'displayName',
      header: 'Name',
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{member.displayName}</div>
            {member.returning_member && (
              <Badge variant="outline" className="ml-2">
                Returning
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'university',
      header: 'University',
    },
    {
      accessorKey: 'faculty',
      header: 'Faculty',
    },
    {
      accessorKey: 'paymentVerified',
      header: 'Payment Status',
      cell: ({ row }) => {
        const verified = row.original.paymentVerified;
        return (
          <Badge variant={verified ? 'default' : 'destructive'}>
            {verified ? 'Verified' : 'Pending'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleViewMember(member.id)}
              title="View member details"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setMemberToDelete(member.id)}
                  title="Delete member"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Member</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this member? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setMemberToDelete(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteMember}>
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

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Members"
        subtitle="View and manage all members"
      />

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={members}
          searchColumn="displayName"
          searchPlaceholder="Search members..."
          emptyState={{
            title: 'No members found',
            description: 'There are no members in the system or none match your search.',
            icon: <UserX className="h-10 w-10 text-muted-foreground/40" />,
          }}
        />
      </div>
    </div>
  );
};

export default Members;
