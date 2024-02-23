import { CreateSessionInputField } from '@/utils/types';
import { Textarea } from 'components/ui/Textarea';
import { useState } from 'react';
import { CardText } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';

export const SessionNotesPicker = () => {
  const field: CreateSessionInputField = 'notes';
  const [notes, setNotes] = useState('');
  const { register } = useFormContext();

  return (
    <div className="w-4/5 lg:w-full px-6 createSessionPickerStyle">
      <CardText className="icon" />
      <h1>Notes</h1>
      <Textarea
        {...register(field)}
        className="text-start h-32 w-full align-start"
        placeholder="Training notes..."
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
    </div>
  );
};
