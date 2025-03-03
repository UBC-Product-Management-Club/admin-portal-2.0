
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembers } from '@/hooks/useMembers';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { User, UserRoundX, MoreHorizontal } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Members = () => {
  const navigate = useNavigate();
  const { members, isLoading, deleteMember } = useMembers();
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleViewMember = (memberId: string) => {
    navigate(`/members/${memberId}`);
  };

  const handleDeleteMember = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete);
      setMemberToDelete(null);
    }
  };

  const columns = [
    {
      accessorKey: 'displayName',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{row.original.displayName || `${row.original.first_name} ${row.original.last_name}`}</span>
        </div>
      ),
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
      accessorKey: 'major',
      header: 'Major',
    },
    {
      accessorKey: 'year',
      header: 'Year',
    },
    {
      accessorKey: 'paymentVerified',
      header: 'Payment Status',
      cell: ({ row }) => (
        <Badge variant={row.original.paymentVerified ? "default" : "outline"}>
          {row.original.paymentVerified ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const member = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewMember(member.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    setMemberToDelete(member.id);
                  }}>
                    Delete member
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this member and remove all their data from the system.
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Members"
        subtitle="Manage organization members"
      />
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={members}
          searchColumn="displayName"
          searchPlaceholder="Search members..."
          emptyState={{
            title: "No members found",
            description: "There are no members in the organization yet.",
            icon: <UserRoundX className="h-10 w-10 text-muted-foreground/40" />,
          }}
        />
      </div>
    </div>
  );
};

export default Members;
