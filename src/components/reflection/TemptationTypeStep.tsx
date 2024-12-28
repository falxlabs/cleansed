import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { TemptationTypeSelector } from "./TemptationTypeSelector";
import { supabase } from "@/integrations/supabase/client";

interface TemptationTypeStepProps {
  selectedSin: string;
  customNote: string;
  onSinChange: (sin: string) => void;
  onCustomNoteChange: (note: string) => void;
}

export const TemptationTypeStep = ({
  selectedSin,
  customNote,
  onSinChange,
  onCustomNoteChange,
}: TemptationTypeStepProps) => {
  useEffect(() => {
    const loadDefaultTemptation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: settings } = await supabase
          .from('temptation_settings')
          .select('default_type')
          .eq('user_id', user.id)
          .maybeSingle();

        if (settings?.default_type && !selectedSin) {
          console.log("Setting default temptation from database:", settings.default_type);
          onSinChange(settings.default_type);
        }
      } catch (error) {
        console.error('Error loading default temptation:', error);
      }
    };

    loadDefaultTemptation();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Type of Temptation</h2>
        <TemptationTypeSelector
          value={selectedSin}
          onChange={onSinChange}
          showText={true}
        />
      </Card>
      
      <div className="space-y-2">
        <Label htmlFor="customNote">Additional details (optional)</Label>
        <Textarea
          id="customNote"
          placeholder="Want to add more details about what you're struggling with?"
          value={customNote}
          onChange={(e) => onCustomNoteChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};