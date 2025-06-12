import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ClipboardCopy } from 'lucide-react';

interface ColorVariantDetail {
  hex: string;
  /** Optional token name, e.g., var(--color-primary-500) or $primary-500 */
  tokenName?: string;
}

interface ColorTokenCardProps {
  /** The main label for this color group, e.g., "Primary Color", "Error State" */
  groupLabel: string;
  /** Optional description for the color group */
  groupDescription?: string;
  
  base: ColorVariantDetail;
  light: ColorVariantDetail;
  dark: ColorVariantDetail;
}

const ColorVariantRow: React.FC<{
  variantTypeLabel: string; // e.g., "Base", "Light Variant", "Dark Variant"
  detail: ColorVariantDetail;
  onCopy: (textToCopy: string, successMessage: string) => void;
}> = ({ variantTypeLabel, detail, onCopy }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors -mx-4 px-4">
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <div
          className="w-10 h-10 rounded-md border shadow-sm"
          style={{ backgroundColor: detail.hex }}
          title={`HEX: ${detail.hex}`}
        />
        <div>
          <p className="font-semibold text-sm">{variantTypeLabel}</p>
          {detail.tokenName && (
            <p className="text-xs text-muted-foreground hidden md:block truncate max-w-[150px]" title={detail.tokenName}>
              Token: {detail.tokenName}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <div className="flex items-center space-x-2 text-xs p-2 rounded-md bg-muted justify-between sm:justify-start w-full sm:w-auto">
          <span className="font-mono select-all">{detail.hex}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onCopy(detail.hex, `${variantTypeLabel} HEX (${detail.hex}) copied.`)}
            aria-label={`Copy ${detail.hex} to clipboard`}
          >
            <ClipboardCopy className="h-3.5 w-3.5" />
          </Button>
        </div>
        {detail.tokenName && (
          <div className="flex items-center space-x-2 text-xs p-2 rounded-md bg-muted justify-between sm:justify-start w-full sm:w-auto md:hidden">
            <span className="font-mono select-all truncate max-w-[100px]" title={detail.tokenName}>{detail.tokenName}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => onCopy(detail.tokenName!, `${variantTypeLabel} token (${detail.tokenName}) copied.`)}
              aria-label={`Copy ${detail.tokenName} to clipboard`}
            >
              <ClipboardCopy className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ColorTokenCard: React.FC<ColorTokenCardProps> = ({
  groupLabel,
  groupDescription,
  base,
  light,
  dark,
}) => {
  const { toast } = useToast();
  console.log(`ColorTokenCard loaded for: ${groupLabel}`);

  const handleCopyToClipboard = (textToCopy: string, successMessage: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard not available",
        description: "Cannot copy to clipboard in this browser.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: successMessage,
      });
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{groupLabel}</CardTitle>
        {groupDescription && (
          <CardDescription>{groupDescription}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-0"> {/* Remove space-y-2 from CardContent, manage spacing in ColorVariantRow */}
        <ColorVariantRow
          variantTypeLabel="Base"
          detail={base}
          onCopy={handleCopyToClipboard}
        />
        <ColorVariantRow
          variantTypeLabel="Light Variant"
          detail={light}
          onCopy={handleCopyToClipboard}
        />
        <ColorVariantRow
          variantTypeLabel="Dark Variant"
          detail={dark}
          onCopy={handleCopyToClipboard}
        />
      </CardContent>
    </Card>
  );
};

export default ColorTokenCard;