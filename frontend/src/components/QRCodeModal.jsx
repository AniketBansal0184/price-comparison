import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, Download, Copy, Share2, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';

const QRCodeModal = ({ isOpen, onClose, product, store }) => {
  const [qrValue, setQrValue] = useState('');
  
  useEffect(() => {
    if (product && store) {
      // Generate affiliate link with UTM parameters and tracking
      const affiliateLink = `${store.link}?ref=BeyondSupplySchool&utm_source=qr&utm_medium=mobile&utm_campaign=product_${product.id}&product=${encodeURIComponent(product.name)}&store=${encodeURIComponent(store.name)}`;
      setQrValue(affiliateLink);
    }
  }, [product, store]);

  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${product?.name}-${store?.name}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      // You could show a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product?.name} - Best Price at ${store?.name}`,
          text: `Check out this great deal on ${product?.name}!`,
          url: qrValue,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  if (!product || !store) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>QR Code - Quick Purchase</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* QR Code Display */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <QRCode
                id="qr-code"
                value={qrValue}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 200 200`}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="secondary">{store.name}</Badge>
              <Badge className="bg-green-100 text-green-700">
                ${store.price}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Scan to open product page on your mobile device
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleCopyLink}
              className="flex items-center justify-center"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="flex items-center justify-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={() => window.open(qrValue, '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Store
            </Button>
          </div>

          {/* Analytics Note */}
          <div className="text-xs text-gray-500 text-center border-t pt-3">
            This QR code includes tracking for analytics and affiliate purposes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;