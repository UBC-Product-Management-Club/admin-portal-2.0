import { useState } from 'react';
import { useEventForms } from '@/hooks/useEventForms';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { FormInput, Plus, Edit, Trash2, FileQuestion } from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { EventForm } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import InProgress from '@/components/shared/InProgress';

type QuestionType = 'short-answer' | 'long-answer' | 'dropdown' | 'checkbox' | 'radio' | 'file';

const EventForms = () => {
  const { eventForms, isLoading, createEventForm, updateEventForm, deleteEventForm } = useEventForms();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [formToEdit, setFormToEdit] = useState<EventForm | null>(null);
  
  const [formData, setFormData] = useState<EventForm>({
    id: '',
    title: '',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState<{
    label: string;
    questionType: QuestionType;
    options: string[];
    required: boolean;
  }>({
    label: '',
    questionType: 'short-answer',
    options: [''],
    required: true,
  });

  const questionTypes = [
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'long-answer', label: 'Long Answer' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio' },
    { value: 'file', label: 'File Upload' },
  ];

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      questions: [],
    });
    setNewQuestion({
      label: '',
      questionType: 'short-answer',
      options: [''],
      required: true,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionTypeChange = (value: string) => {
    setNewQuestion((prev) => ({ 
      ...prev, 
      questionType: value as QuestionType,
      options: [''] 
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setNewQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const addOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion((prev) => {
      const updatedOptions = prev.options.filter((_, i) => i !== index);
      return { ...prev, options: updatedOptions.length ? updatedOptions : [''] };
    });
  };

  const addQuestion = () => {
    if (!newQuestion.label.trim()) {
      toast.error('Question label cannot be empty');
      return;
    }

    const isMultiChoiceType = ['dropdown', 'checkbox', 'radio'].includes(newQuestion.questionType);
    
    const filteredOptions = isMultiChoiceType
                          ? newQuestion.options.filter(option => option.trim() !== '')
                          : undefined;

    if (isMultiChoiceType && (!filteredOptions || filteredOptions.length === 0)) {
      toast.error('Multi-choice questions must have at least one option');
      return;
    }

    const questionToAdd = {
      ...newQuestion,
      options: filteredOptions,
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, questionToAdd],
    }));

    setNewQuestion({
      label: '',
      questionType: 'short-answer',
      options: [''],
      required: true,
    });
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleCreateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Form title cannot be empty');
      return;
    }

    if (formData.questions.length === 0) {
      toast.error('Form must have at least one question');
      return;
    }

    const { id, ...formDataWithoutId } = formData;
    createEventForm(formDataWithoutId);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditClick = (form: EventForm) => {
    setFormToEdit(form);
    setFormData(form);
    setIsEditOpen(true);
  };

  const handleUpdateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Form title cannot be empty');
      return;
    }

    if (formData.questions.length === 0) {
      toast.error('Form must have at least one question');
      return;
    }

    if (formToEdit) {
      updateEventForm(formData);
    }
    setIsEditOpen(false);
    setFormToEdit(null);
    resetForm();
  };

  const handleDeleteForm = () => {
    if (formToDelete) {
      deleteEventForm(formToDelete);
      setFormToDelete(null);
    }
  };

  return (
    <InProgress>
        <div className="container mx-auto p-6">
        <PageHeader
            title="Event Forms"
            subtitle="Create and manage event registration forms"
            actions={
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Form
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Event Form</DialogTitle>
                    <DialogDescription>
                    Design a custom registration form for your events.
                    </DialogDescription>
                </DialogHeader>
              
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                    <Label htmlFor="title">Form Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter form title"
                    />
                    </div>
                
                    {formData.questions.length > 0 && (
                    <div className="space-y-4 mt-4">
                        <h3 className="text-lg font-medium">Form Questions</h3>
                        {formData.questions.map((question, index) => (
                        <Card key={index}>
                            <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                <CardTitle className="text-base">{question.label}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                    <Badge variant="outline" className="mr-2">
                                    {questionTypes.find(t => t.value === question.questionType)?.label}
                                    </Badge>
                                    {question.required && (
                                    <Badge variant="secondary">Required</Badge>
                                    )}
                                </CardDescription>
                                </div>
                                <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeQuestion(index)}
                                >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            </CardHeader>
                            {(['dropdown', 'checkbox', 'radio'].includes(question.questionType as QuestionType)) && 
                            question.options && (
                            <CardContent>
                                <div className="space-y-1">
                                <p className="text-sm font-medium">Options:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {question.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                    ))}
                                </ul>
                                </div>
                            </CardContent>
                            )}
                        </Card>
                        ))}
                    </div>
                    )}
                
                    <Separator className="my-2" />
                
                    <div className="space-y-4 mt-2">
                    <h3 className="text-lg font-medium">Add Question</h3>
                    <div className="grid gap-3">
                        <div className="grid gap-2">
                        <Label htmlFor="label">Question Text</Label>
                        <Input
                            id="label"
                            name="label"
                            value={newQuestion.label}
                            onChange={handleQuestionInputChange}
                            placeholder="Enter your question"
                        />
                        </div>
                    
                        <div className="grid gap-2">
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select
                            value={newQuestion.questionType}
                            onValueChange={handleQuestionTypeChange}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                            {questionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                {type.label}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                    
                        {['dropdown', 'checkbox', 'radio'].includes(newQuestion.questionType) && (
                        <div className="space-y-3">
                            <Label>Options</Label>
                            {newQuestion.options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                />
                                <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeOption(index)}
                                disabled={newQuestion.options.length <= 1}
                                >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            ))}
                            <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addOption}
                            className="mt-2"
                            >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Option
                            </Button>
                        </div>
                        )}
                    
                        <div className="flex items-center space-x-2 mt-1">
                        <Switch
                            id="required"
                            checked={newQuestion.required}
                            onCheckedChange={(checked) => 
                            setNewQuestion((prev) => ({ ...prev, required: checked }))
                            }
                        />
                        <Label htmlFor="required">Required question</Label>
                        </div>
                    
                        <Button type="button" onClick={addQuestion} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                        </Button>
                    </div>
                    </div>
                </div>
              
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
                    <Button onClick={handleCreateForm}>Create Form</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            }
        />

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Event Form</DialogTitle>
                <DialogDescription>
                Make changes to the form structure and questions.
                </DialogDescription>
            </DialogHeader>
          
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="title">Form Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter form title"
                />
                </div>
            
                {formData.questions.length > 0 && (
                <div className="space-y-4 mt-4">
                    <h3 className="text-lg font-medium">Form Questions</h3>
                    {formData.questions.map((question, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                            <CardTitle className="text-base">{question.label}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">
                                {questionTypes.find(t => t.value === question.questionType)?.label}
                                </Badge>
                                {question.required && (
                                <Badge variant="secondary">Required</Badge>
                                )}
                            </CardDescription>
                            </div>
                            <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeQuestion(index)}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        </CardHeader>
                        {(['dropdown', 'checkbox', 'radio'].includes(question.questionType as QuestionType)) && 
                        question.options && (
                        <CardContent>
                            <div className="space-y-1">
                            <p className="text-sm font-medium">Options:</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {question.options.map((option, i) => (
                                <li key={i}>{option}</li>
                                ))}
                            </ul>
                            </div>
                        </CardContent>
                        )}
                    </Card>
                    ))}
                </div>
                )}
            
                <Separator className="my-2" />
            
                <div className="space-y-4 mt-2">
                <h3 className="text-lg font-medium">Add Question</h3>
                <div className="grid gap-3">
                    <div className="grid gap-2">
                    <Label htmlFor="label">Question Text</Label>
                    <Input
                        id="label"
                        name="label"
                        value={newQuestion.label}
                        onChange={handleQuestionInputChange}
                        placeholder="Enter your question"
                    />
                    </div>
                
                    <div className="grid gap-2">
                    <Label htmlFor="questionType">Question Type</Label>
                    <Select
                        value={newQuestion.questionType}
                        onValueChange={handleQuestionTypeChange}
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                        {questionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                            {type.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                
                    {['dropdown', 'checkbox', 'radio'].includes(newQuestion.questionType) && (
                    <div className="space-y-3">
                        <Label>Options</Label>
                        {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            />
                            <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeOption(index)}
                            disabled={newQuestion.options.length <= 1}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                        <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        className="mt-2"
                        >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                        </Button>
                    </div>
                    )}
                
                    <div className="flex items-center space-x-2 mt-1">
                    <Switch
                        id="required"
                        checked={newQuestion.required}
                        onCheckedChange={(checked) => 
                        setNewQuestion((prev) => ({ ...prev, required: checked }))
                        }
                    />
                    <Label htmlFor="required">Required question</Label>
                    </div>
                
                    <Button type="button" onClick={addQuestion} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                    </Button>
                </div>
                </div>
            </div>
          
            <DialogFooter>
                <Button 
                variant="outline" 
                onClick={() => {
                    setIsEditOpen(false);
                    setFormToEdit(null);
                    resetForm();
                }}
                >
                Cancel
                </Button>
                <Button onClick={handleUpdateForm}>Save Changes</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
            <p>Loading event forms...</p>
            ) : eventForms.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
                <FileQuestion className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <h3 className="text-xl font-medium">No forms found</h3>
                <p className="text-muted-foreground mt-2 text-center max-w-md">
                You haven't created any event registration forms yet. Create a form to collect information from event attendees.
                </p>
                <Button 
                onClick={() => setIsCreateOpen(true)}
                className="mt-6"
                >
                <Plus className="mr-2 h-4 w-4" />
                Create Form
                </Button>
            </div>
            ) : (
            eventForms.map((form) => (
                <Card key={form.id} className="overflow-hidden">
                <CardHeader>
                    <CardTitle>{form.title}</CardTitle>
                    <CardDescription>
                    {form.questions.length} {form.questions.length === 1 ? 'question' : 'questions'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    <p className="text-sm font-medium">Questions preview:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        {form.questions.slice(0, 3).map((question, index) => (
                        <li key={index} className="flex items-center">
                            <span className="truncate">{question.label}</span>
                            {question.required && (
                            <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                            )}
                        </li>
                        ))}
                        {form.questions.length > 3 && (
                        <li className="text-xs text-muted-foreground italic">
                            + {form.questions.length - 3} more questions
                        </li>
                        )}
                    </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 p-4">
                    <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(form)}
                    >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                    </Button>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setFormToDelete(form.id)}
                        >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Delete Form</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this form? This action cannot be undone.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setFormToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteForm}>
                            Delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
                </Card>
            ))
            )}
        </div>
        </div>
    </InProgress>
  );
};

export default EventForms;
