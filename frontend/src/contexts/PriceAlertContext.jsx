import React, { createContext, useContext, useState, useEffect } from 'react';

const PriceAlertContext = createContext();

export const usePriceAlert = () => {
  const context = useContext(PriceAlertContext);
  if (!context) {
    throw new Error('usePriceAlert must be used within a PriceAlertProvider');
  }
  return context;
};

export const PriceAlertProvider = ({ children }) => {
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load price alerts from localStorage
  useEffect(() => {
    const savedAlerts = localStorage.getItem('BeyondSupplySchool_alerts');
    if (savedAlerts) {
      try {
        setPriceAlerts(JSON.parse(savedAlerts));
      } catch (error) {
        console.error('Error loading price alerts:', error);
      }
    }
  }, []);

  // Save price alerts to localStorage
  useEffect(() => {
    localStorage.setItem('BeyondSupplySchool_alerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  const createPriceAlert = (productId, productName, targetPrice, email = '') => {
    const alert = {
      id: Date.now(),
      productId,
      productName,
      targetPrice: parseFloat(targetPrice),
      email,
      isActive: true,
      createdAt: new Date().toISOString(),
      triggeredAt: null
    };

    setPriceAlerts(prev => [...prev, alert]);
    return alert;
  };

  const deletePriceAlert = (alertId) => {
    setPriceAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const togglePriceAlert = (alertId) => {
    setPriceAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, isActive: !alert.isActive }
          : alert
      )
    );
  };

  const hasActiveAlert = (productId) => {
    return priceAlerts.some(alert => 
      alert.productId === productId && alert.isActive
    );
  };

  const getActiveAlertsForProduct = (productId) => {
    return priceAlerts.filter(alert => 
      alert.productId === productId && alert.isActive
    );
  };

  const checkPriceAlerts = (productId, currentPrice) => {
    const alerts = getActiveAlertsForProduct(productId);
    const triggeredAlerts = alerts.filter(alert => currentPrice <= alert.targetPrice);
    
    if (triggeredAlerts.length > 0) {
      triggeredAlerts.forEach(alert => {
        const notification = {
          id: Date.now() + Math.random(),
          type: 'price_drop',
          title: 'Price Alert Triggered!',
          message: `${alert.productName} is now $${currentPrice} (Target: $${alert.targetPrice})`,
          productId: alert.productId,
          timestamp: new Date().toISOString()
        };
        
        setNotifications(prev => [notification, ...prev]);
        
        // Mark alert as triggered
        setPriceAlerts(prev =>
          prev.map(a =>
            a.id === alert.id
              ? { ...a, triggeredAt: new Date().toISOString() }
              : a
          )
        );
      });
    }
    
    return triggeredAlerts.length > 0;
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getActiveAlertsCount = () => {
    return priceAlerts.filter(alert => alert.isActive).length;
  };

  const value = {
    priceAlerts,
    notifications,
    createPriceAlert,
    deletePriceAlert,
    togglePriceAlert,
    hasActiveAlert,
    getActiveAlertsForProduct,
    checkPriceAlerts,
    dismissNotification,
    getActiveAlertsCount
  };

  return (
    <PriceAlertContext.Provider value={value}>
      {children}
    </PriceAlertContext.Provider>
  );
};