import { AddSessionInputField } from '@/utils/types';
import { Textarea } from 'components/ui/Textarea';
import { useState } from 'react';
import { CardText } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';

export const SessionNotesPicker = () => {
  const field: AddSessionInputField = 'notes';
  const [notes, setNotes] = useState('');
  const { register } = useFormContext();

  return (
    <div className="w-full px-6 creationSessionPickerStyle">
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
