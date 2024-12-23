import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  firstName: string;
  age: string;
  email?: string;
}

export function useProfileManagement() {
  const { toast } = useToast();

  const updateProfile = async (profileData: ProfileData) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profileData.firstName,
        age: profileData.age ? parseInt(profileData.age) : null,
        ...(profileData.email && { email: profileData.email }),
      })
      .eq('id', session.user.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile data. Please try again.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return { updateProfile };
}