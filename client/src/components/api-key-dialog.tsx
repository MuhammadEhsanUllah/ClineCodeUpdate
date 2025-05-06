import { useState } from 'react';
import { useApiKey } from '@/hooks/use-api-key';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApiKeyDialog({ open, onOpenChange }: ApiKeyDialogProps) {
  const { apiKey, setApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const { toast } = useToast();

  const handleSave = () => {
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      toast({
        title: 'API Key Saved',
        description: 'Your API key has been saved successfully.',
        duration: 3000,
      });
      onOpenChange(false);
    } else {
      toast({
        title: 'API Key Required',
        description: 'Please enter a valid API key.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Configuration</DialogTitle>
          <DialogDescription>
            Enter your API key to access external services. This will be stored securely in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">
              API Key
            </label>
            <Input
              id="api-key"
              placeholder="Enter your API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              type="password"
            />
          </div>
          <p className="text-xs text-slate-500">
            You can obtain an API key by signing up at our API provider's website.
            <br />
            Without a valid API key, the application will use mock data.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}