import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TwitterSupport() {
  const handle = '@' + 'chrispkobler';
  
  const handleTwitterClick = () => {
    window.open(`https://x.com/${handle.substring(1)}`, '_blank');
  };

  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <Twitter className="h-5 w-5 mt-1 text-muted-foreground" />
        <div>
          <h3 className="font-medium">X (Twitter) Support</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Engage with us on X (Twitter) at{' '}
            <span className="select-all">{handle}</span>
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={handleTwitterClick}>
            Open X
          </Button>
        </div>
      </div>
    </Card>
  );
}