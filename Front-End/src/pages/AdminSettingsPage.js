import React, { useState } from 'react';
import './css/AdminSettingPage.css';

const AdminSettingPage = () => {
  const [settings, setSettings] = useState({
    users: [],
    platformConfig: {},
    securityPolicies: {},
    reports: [],
  });

  const [loading, setLoading] = useState(false);

  // Simulate API call delay
  const simulateApiCall = (response, delay = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(response), delay);
    });
  };

  // Fetch Users (Simulated)
  const handleViewUsers = async () => {
    setLoading(true);
    try {
      const users = await simulateApiCall(['User1', 'User2', 'Admin'], 1500);
      setSettings({ ...settings, users });
      console.log('Fetched Users:', users);
      alert(`Fetched Users: ${users.join(', ')}`);
    } catch (error) {
      alert('Failed to fetch users.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add User with Validation
  const handleAddUser = async () => {
    const newUser = prompt('Enter the new user name:');
    if (!newUser) {
      alert('User name cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const updatedUsers = await simulateApiCall([...settings.users, newUser], 1000);
      setSettings({ ...settings, users: updatedUsers });
      alert(`User "${newUser}" added successfully!`);
      console.log('Updated Users:', updatedUsers);
    } catch (error) {
      alert('Failed to add user.');
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Platform Configurations with Mock API Call
  const handleUpdateConfigurations = async () => {
    setLoading(true);
    try {
      const newConfig = await simulateApiCall(
        { theme: 'dark', language: 'en', timezone: 'UTC' },
        2000
      );
      setSettings({ ...settings, platformConfig: newConfig });
      alert('Platform configurations updated successfully.');
      console.log('Updated Platform Configurations:', newConfig);
    } catch (error) {
      alert('Failed to update configurations.');
      console.error('Error updating configurations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manage Security Policies with Deep Validation
  const handleManagePolicies = async () => {
    setLoading(true);
    try {
      const updatedPolicies = await simulateApiCall(
        { twoFactorAuth: true, loginAlerts: true },
        2000
      );
      setSettings({ ...settings, securityPolicies: updatedPolicies });
      alert('Security policies updated.');
      console.log('Updated Security Policies:', updatedPolicies);
    } catch (error) {
      alert('Failed to manage security policies.');
      console.error('Error managing policies:', error);
    } finally {
      setLoading(false);
    }
  };

  // View Reports with Filter
  const handleViewReports = async () => {
    setLoading(true);
    try {
      const reports = await simulateApiCall(
        [
          { id: 1, name: 'Monthly Report', date: '2024-11-01' },
          { id: 2, name: 'User Activity Report', date: '2024-11-15' },
        ],
        1500
      );
      setSettings({ ...settings, reports });
      alert('Reports fetched successfully. Check console for details.');
      console.log('Reports:', reports);
    } catch (error) {
      alert('Failed to fetch reports.');
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save All Settings with Feedback
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await simulateApiCall('Settings saved successfully.', 2000);
      alert('All settings have been saved successfully!');
      console.log('Current Settings:', settings);
    } catch (error) {
      alert('Failed to save settings.');
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings-page">
      <h1 className="admin-settings-title">Admin Settings</h1>

      {loading && <p className="loading-message">Processing... Please wait.</p>}

      <div className="admin-settings-container">
        {/* User Management Section */}
        <div className="admin-settings-section">
          <h2>👤 User Management</h2>
          <p>Manage user accounts and roles.</p>
          <button className="admin-action-button" onClick={handleViewUsers}>
            View Users
          </button>
          <button className="admin-action-button" onClick={handleAddUser}>
            Add User
          </button>
        </div>

        {/* Platform Settings Section */}
        <div className="admin-settings-section">
          <h2>⚙️ Platform Settings</h2>
          <p>Configure system-wide settings and preferences.</p>
          <button className="admin-action-button" onClick={handleUpdateConfigurations}>
            Update Configurations
          </button>
        </div>

        {/* Security Section */}
        <div className="admin-settings-section">
          <h2>🔒 Security</h2>
          <p>Set up advanced security features and policies.</p>
          <button className="admin-action-button" onClick={handleManagePolicies}>
            Manage Policies
          </button>
        </div>

        {/* Reports Section */}
        <div className="admin-settings-section">
          <h2>📊 Reports</h2>
          <p>Generate and review system reports.</p>
          <button className="admin-action-button" onClick={handleViewReports}>
            View Reports
          </button>
        </div>
      </div>

      <button className="admin-save-button" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default AdminSettingPage;
