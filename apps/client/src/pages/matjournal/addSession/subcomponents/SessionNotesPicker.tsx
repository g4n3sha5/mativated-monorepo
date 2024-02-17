import { Textarea } from 'components/ui/Textarea';
import { useState } from 'react';
import { CardText } from 'react-bootstrap-icons';

export const SessionNotesPicker = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="lg:w-721 w-full px-12 addSessionPickerStyle">
      <CardText className="icon" />
      <h1>Notes</h1>
      <Textarea
        className="text-start h-32 align-start"
        placeholder="Training notes..."
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
    </div>
  );
};
