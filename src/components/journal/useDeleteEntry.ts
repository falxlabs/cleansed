import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useDeleteEntry = (onDelete?: (id: number) => void, onClose?: () => void) => {
  const { toast } = useToast();

  const deleteEntry = async (entryId: number, isCheckIn: boolean) => {
    try {
      console.log('Starting deletion process for entry:', entryId, 'isCheckIn:', isCheckIn);
      
      // First delete the specific entry (temptation or check-in)
      const specificTable = isCheckIn ? 'checkin_entries' : 'temptation_entries';
      const { error: specificError } = await supabase
        .from(specificTable)
        .delete()
        .eq('id', entryId);

      console.log('Specific entry deletion result:', { specificError });
      if (specificError) throw specificError;

      // Then delete the parent journal entry
      const { error: journalError } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId);

      console.log('Journal entry deletion result:', { journalError });
      if (journalError) throw journalError;

      if (onDelete) {
        onDelete(entryId);
      }
      
      if (onClose) {
        onClose();
      }
      
      toast({
        title: "Entry deleted",
        description: "The entry has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { deleteEntry };
};