"use client"
import React from 'react';

const Notifications = () => {
  return (
    <div  style={{margin: 50}}>
      <div
        style={{
          backgroundColor: '#1f2937',
          border: '1px solid #4b5563',
          borderRadius: '8px',
          padding: '16px',
          maxWidth: '400px',
          color: '#fff',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>
            Recent Notifications
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Stay updated on your financial activities
          </p>
        </div>
        <div>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {/* Notification 1 */}
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div
                style={{
                  height: '8px',
                  width: '8px',
                  marginTop: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              ></div>
              <div style={{ marginLeft: '8px' }}>
                <p style={{ fontWeight: '600', margin: '0' }}>Large Deposit Detected</p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '4px 0' }}>
                  A deposit of $5,000 was made to your account.
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>2 hours ago</p>
              </div>
            </li>
            {/* Notification 2 */}
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div
                style={{
                  height: '8px',
                  width: '8px',
                  marginTop: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#facc15',
                }}
              ></div>
              <div style={{ marginLeft: '8px' }}>
                <p style={{ fontWeight: '600', margin: '0' }}>Upcoming Bill Payment</p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '4px 0' }}>
                  Your electricity bill of $150 is due in 3 days.
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 day ago</p>
              </div>
            </li>
            {/* Notification 3 */}
            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div
                style={{
                  height: '8px',
                  width: '8px',
                  marginTop: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              ></div>
              <div style={{ marginLeft: '8px' }}>
                <p style={{ fontWeight: '600', margin: '0' }}>Savings Goal Achieved</p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '4px 0' }}>
                  Congratulations! You've reached your savings goal of $10,000.
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>3 days ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
