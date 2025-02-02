import React, { useState } from 'react';
import { Button } from '../ui/button';
interface EventDialogProps {
  id: string;
}

const EventDialog: React.FC<EventDialogProps> = (id) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [refferalRoute,setRefferalRoute] = useState("https://cause-connect-flax.vercel.app//events/");
  const handleCopy = (text: string,text_1:string) => {
    const event_link = text.concat(text_1);
    navigator.clipboard.writeText(event_link);
    setIsCopied(true);
//     alert(`Copied: ${text}`);
  };
  return (
    <div>
      {/* Button to open dialog */}
      <Button className="flex-1 h-10 rounded-full bg-yellow-400 text-blue-900 font-semibold py-2 text-base font-semibold  hover:bg-yellow-500 transition-all duration-300" onClick={() => setDialogOpen(true)}>
Reffer to friends or family
      </Button>
      {/* Dialog Box */}
      {isDialogOpen && (
        <div style={dialogStyles}>
          <p>
            <strong>Event Link : </strong> {refferalRoute}{id.id}
            
            {isCopied?<Button className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded mt-4 hover:bg-yellow-300" onClick={() => handleCopy(refferalRoute,id.id)}>Copied</Button>
             :<Button className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded mt-4 hover:bg-yellow-300" onClick={() => handleCopy(refferalRoute,id.id)}>Copy</Button>}
          </p>
          <Button className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded mt-4 hover:bg-yellow-300" 
          onClick={()=>{ setDialogOpen(false);
                setIsCopied(false);
          }}>Close</Button>
        </div>
      )}
    </div>
  );
};

// Inline styles for the dialog box
const dialogStyles: React.CSSProperties = {
  position: 'fixed',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 1000,
  textAlign: 'center',
};

export default EventDialog;