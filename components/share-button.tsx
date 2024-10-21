import { CopyIcon, Share2Icon, CheckIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogTrigger 
} from "./ui/alert-dialog";
import { 
  FacebookShareButton, 
  FacebookIcon, 
  EmailShareButton, 
  EmailIcon, 
  TelegramShareButton, 
  TelegramIcon, 
  WhatsappShareButton, 
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon, 
} from 'next-share';
import { useState } from "react";

interface ShareDialogProps {
  onClose: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ onClose }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://movie-marathon-2.vercel.app';
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between">
      <AlertDialogHeader className="items-center flex w-full">
        <p>Share this link</p>
        <Button
          className="absolute top-0 right-0"
          variant="ghost"
          size="icon"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
      </AlertDialogHeader>
      <AlertDialogDescription>
        <div className="flex justify-center mt-4 gap-4">
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <EmailShareButton url={currentUrl}>
            <EmailIcon size={32} round />
          </EmailShareButton>

          <TelegramShareButton url={currentUrl}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <WhatsappShareButton url={currentUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          
          <Button onClick={handleCopyLink} size='icon' variant='outline'>
            {copied ? <CheckIcon className="text-green-600" /> : <CopyIcon />}
          </Button>
        </div>
      </AlertDialogDescription>

      {copied && (
        <p className="mt-2 text-sm text-green-600">
          Link copied to clipboard!
        </p>
      )}
    </div>
  );
};

const SocialShareButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Share2Icon className="text-cyan-950" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="relative">
          <ShareDialog onClose={() => setOpen(false)} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SocialShareButton;
