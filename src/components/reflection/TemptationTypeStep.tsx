import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { TemptationTypeSelector } from "./TemptationTypeSelector";

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
    const savedTemptation = localStorage.getItem("defaultTemptation");
    if (savedTemptation && !selectedSin) {
      onSinChange(savedTemptation);
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Type of Temptation</h2>
      <Card className="p-6">
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