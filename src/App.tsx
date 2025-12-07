import { useState, useEffect } from 'react';
import './index.css';

interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}

interface Alert {
    id: number;
    coin: string;
    message: string;
    type: 'price' | 'volume' | 'trend';
    timestamp: Date;
}

function App() {
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
}, []);

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
};

const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return formatPrice(num);
};

if (loading) {
    return (
        <div className="loading">
            <h2>🔄 Loading Crypto Market Data...</h2>
        </div>
    );
}

return (
    <div>
        <header className="app-header">
            <h1>🚀 Crypto Watch</h1>
            <p>Real-time cryptocurrency market surveillance with advanced analytics</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
        </header>

        <div className="dashboard">
            {cryptos.map((crypto) => (
                <div key={crypto.id} className="card">
                    <div className="card-header">
                        <h3 className="card-title">{crypto.name}</h3>
                        <span style={{ fontSize: '1.5rem' }}>
                            {crypto.symbol === 'btc' && '₿'}
                            {crypto.symbol === 'eth' && 'Ξ'}
                            {crypto.symbol !== 'btc' && crypto.symbol !== 'eth' && '💎'}
                        </span>
                    </div>

                    <div className="price">{formatPrice(crypto.current_price)}</div>

                    <div className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                        <span>{crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}</span>
                        <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-label">Market Cap</div>
                            <div className="stat-value">{formatLargeNumber(crypto.market_cap)}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h Volume</div>
                            <div className="stat-value">{formatLargeNumber(crypto.total_volume)}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h High</div>
                            <div className="stat-value">{formatPrice(crypto.high_24h)}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">24h Low</div>
                            <div className="stat-value">{formatPrice(crypto.low_24h)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {alerts.length > 0 && (
            <div className="alert-section">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>📊 Market Alerts</h2>
                {alerts.map((alert) => (
                    <div key={alert.id} className="alert-item">
                        <div className="alert-icon">
                            {alert.type === 'price' && '💰'}
                            {alert.type === 'volume' && '📈'}
                            {alert.type === 'trend' && '🔔'}
                        </div>
                        <div className="alert-content">
                            <h4>{alert.coin}</h4>
                            <p>{alert.message}</p>
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.3rem' }}>
                                {alert.timestamp.toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', opacity: 0.5 }}>
            <p>Data provided by CoinGecko API • Updates every 60 seconds</p>
        </div>
    </div>
);
}

export default App;
