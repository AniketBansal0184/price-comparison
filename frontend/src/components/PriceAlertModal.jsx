import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Bell, 
  DollarSign, 
  Mail, 
  TrendingDown,
  AlertCircle,
  Check,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { usePriceAlert } from '../contexts/PriceAlertContext';
import { useToast } from '../hooks/use-toast';

const PriceAlertModal = ({ isOpen, onClose, product }) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [email, setEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const { 
    createPriceAlert, 
    deletePriceAlert, 
    togglePriceAlert,
    getActiveAlertsForProduct,
    hasActiveAlert
  } = usePriceAlert();
  const { toast } = useToast();

  if (!product) return null;

  const currentPrice = Math.min(...product.stores.map(s => s.price));
  const existingAlerts = getActiveAlertsForProduct(product.id);
  const hasAlerts = hasActiveAlert(product.id);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    
    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid target price.",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(targetPrice) >= currentPrice) {
      toast({
        title: "Price too high",
        description: "Target price should be lower than current price.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      const alert = createPriceAlert(
        product.id,
        product.name,
        targetPrice,
        email
      );

      toast({
        title: "Price alert created!",
        description: `You'll be notified when ${product.name} drops to $${targetPrice}`,
      });

      // Reset form
      setTargetPrice('');
      setEmail('');
      
    } catch (error) {
      toast({
        title: "Error creating alert",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteAlert = (alertId) => {
    deletePriceAlert(alertId);
    toast({
      title: "Alert deleted",
      description: "Price alert has been removed.",
    });
  };

  const handleToggleAlert = (alertId, isActive) => {
    togglePriceAlert(alertId);
    toast({
      title: isActive ? "Alert paused" : "Alert activated",
      description: isActive ? "You won't receive notifications." : "You'll receive notifications again.",
    });
  };

  const getSavingsPercentage = (target, current) => {
    return Math.round(((current - target) / current) * 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Price Alerts</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border">
            <img 
              src={product.images?.[0]} 
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700 text-xs">
                  Current: ${currentPrice}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.stores.length} stores
                </Badge>
              </div>
            </div>
          </div>

          {/* Existing Alerts */}
          {existingAlerts.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Active Alerts ({existingAlerts.length})
              </h4>
              
              <div className="space-y-2">
                {existingAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Target: ${alert.targetPrice}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getSavingsPercentage(alert.targetPrice, currentPrice)}% savings
                        </Badge>
                      </div>
                      {alert.email && (
                        <p className="text-xs text-gray-600 mt-1">
                          📧 {alert.email}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Created {new Date(alert.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAlert(alert.id, alert.isActive)}
                        className="p-1"
                      >
                        {alert.isActive ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
            </div>
          )}

          {/* Create New Alert */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Create New Alert
            </h4>
            
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetPrice" className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Target Price
                </Label>
                <div className="relative">
                  <Input
                    id="targetPrice"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={currentPrice - 0.01}
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder={`Less than $${currentPrice}`}
                    className="pl-8"
                    required
                  />
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {targetPrice && (
                  <p className="text-xs text-green-600">
                    You'll save {getSavingsPercentage(parseFloat(targetPrice) || 0, currentPrice)}% 
                    (${(currentPrice - (parseFloat(targetPrice) || 0)).toFixed(2)})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500">
                  Leave empty to receive browser notifications only
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isCreating || !targetPrice}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Alert...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Create Price Alert
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>We check prices multiple times daily</li>
                  <li>You'll get notified when target price is reached</li>
                  <li>Alerts remain active until you delete them</li>
                  <li>No spam - only important price drops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertModal;