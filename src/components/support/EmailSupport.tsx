import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmailSupport() {
  const email = 'cleansed' + '@' + 'falxlabs.com';
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
        <div>
          <h3 className="font-medium">Email Support</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Send us an email at{' '}
            <span className="select-all">{email}</span>
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={handleEmailClick}>
            Send Email
          </Button>
        </div>
      </div>
    </Card>
  );
}