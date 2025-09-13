import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Share2, 
  Copy, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  MessageSquare,
  QrCode,
  Check,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ShareModal = ({ isOpen, onClose, product, url }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!product) return null;

  const shareUrl = url || `${window.location.origin}/product/${product.id}`;
  const shareTitle = `Check out this amazing deal on ${product.name}!`;
  const shareText = `Found ${product.name} starting from $${Math.min(...product.stores.map(s => s.price))} on PriceSpy!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The product link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    }
  ];

  const handleSocialShare = (socialUrl) => {
    window.open(socialUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Share Product</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img 
              src={product.images?.[0]} 
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-700 text-xs">
                  From ${Math.min(...product.stores.map(s => s.price))}
                </Badge>
                <span className="text-xs text-gray-500">{product.stores.length} stores</span>
              </div>
            </div>
          </div>

          {/* Native Share (Mobile) */}
          {navigator.share && (
            <Button 
              onClick={handleNativeShare}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share via Device
            </Button>
          )}

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Share Link</label>
            <div className="flex space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleCopyLink}
                variant={copied ? "default" : "outline"}
                className={copied ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  onClick={() => handleSocialShare(option.url)}
                  className="flex items-center justify-center space-x-2 p-3"
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* QR Code Option */}
          <div className="border-t pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onClose();
                // This would trigger QR code modal - we'll integrate this
                const event = new CustomEvent('openQRCode', { 
                  detail: { product, store: product.stores[0] } 
                });
                window.dispatchEvent(event);
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </div>

          {/* Analytics Note */}
          <div className="text-xs text-gray-500 text-center border-t pt-3">
            Share links include tracking for analytics purposes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;