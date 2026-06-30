import React, { useState, useEffect } from 'react';
import { Settings, Check, AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Link2 } from 'lucide-react';
import type { StrapiConfig } from '../types';
import { strapiService } from '../services/strapi';
import './StrapiPanel.css';

interface StrapiPanelProps {
  config: StrapiConfig;
  onConfigChange: (newConfig: StrapiConfig) => void;
}

export const StrapiPanel: React.FC<StrapiPanelProps> = ({ config, onConfigChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(config.apiUrl);
  const [isEnabled, setIsEnabled] = useState(config.isEnabled);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [activeTab, setActiveTab] = useState<'config' | 'schema'>('config');

  useEffect(() => {
    setApiUrl(config.apiUrl);
    setIsEnabled(config.isEnabled);
  }, [config]);

  const handleTestConnection = async () => {
    setTestStatus('testing');
    const isOk = await strapiService.testConnection(apiUrl);
    setTestStatus(isOk ? 'success' : 'failed');
  };

  const handleSave = () => {
    const updated = { apiUrl, isEnabled };
    strapiService.saveConfig(updated);
    onConfigChange(updated);
    setIsOpen(false);
    // Reload state or trigger window refresh to reflect changes
    window.location.reload();
  };

  return (
    <div className={`strapi-dev-panel ${isOpen ? 'panel-expanded' : 'panel-collapsed'}`}>
      {/* Header / Toggle Button */}
      <button className="panel-header-btn" onClick={() => setIsOpen(!isOpen)}>
        <div className="btn-title-area">
          <Settings size={18} className={isEnabled ? 'spin-icon' : ''} />
          <span>Strapi Developer Panel</span>
          <span className={`status-pill ${isEnabled ? 'status-active' : 'status-mock'}`}>
            {isEnabled ? 'Live Strapi' : 'Mock Mode'}
          </span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {isOpen && (
        <div className="panel-content-body">
          {/* Navigation Tabs */}
          <div className="panel-tabs">
            <button 
              className={`panel-tab-btn ${activeTab === 'config' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('config')}
            >
              Config Connection
            </button>
            <button 
              className={`panel-tab-btn ${activeTab === 'schema' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('schema')}
            >
              Strapi Schema Guidelines
            </button>
          </div>

          {activeTab === 'config' ? (
            <div className="tab-panel config-tab">
              <div className="panel-form-group checkbox-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={isEnabled} 
                    onChange={(e) => setIsEnabled(e.target.checked)} 
                  />
                  <span className="checkbox-checkmark"></span>
                  <span className="label-text-bold">Enable Strapi API Mode</span>
                </label>
                <p className="field-hint">
                  When checked, the application will fetch live categories and articles from the Strapi endpoint instead of using local mock objects.
                </p>
              </div>

              <div className="panel-form-group">
                <label htmlFor="panel-endpoint">Strapi API Host URL</label>
                <input 
                  type="text" 
                  id="panel-endpoint"
                  value={apiUrl} 
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:1337"
                />
              </div>

              {/* Status and Action bar */}
              <div className="connection-actions">
                <button 
                  className="btn-secondary" 
                  onClick={handleTestConnection}
                  disabled={testStatus === 'testing'}
                >
                  {testStatus === 'testing' && <RefreshCw size={14} className="spin-loading" />}
                  Test Connection
                </button>
                <button className="btn-panel-save" onClick={handleSave}>
                  Save & Reload
                </button>
              </div>

              {/* Test Status Messages */}
              {testStatus === 'success' && (
                <div className="test-alert alert-success">
                  <Check size={16} />
                  <span>Success! Connection verified. Ready to fetch api/articles.</span>
                </div>
              )}
              {testStatus === 'failed' && (
                <div className="test-alert alert-danger">
                  <AlertTriangle size={16} />
                  <span>Failed. Cannot resolve host. Ensure Strapi is running and public permissions are set.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="tab-panel schema-tab">
              <p className="schema-intro">
                To connect this frontend to Strapi successfully, set up the following Content Types in your Strapi Admin Panel:
              </p>

              <div className="schema-section">
                <div className="schema-heading">
                  <Link2 size={14} /> <strong>1. Category Collection</strong>
                </div>
                <ul className="schema-list">
                  <li><code>name</code> (Text, Short)</li>
                  <li><code>slug</code> (UID, linked to <code>name</code>)</li>
                </ul>
              </div>

              <div className="schema-section">
                <div className="schema-heading">
                  <Link2 size={14} /> <strong>2. Article Collection</strong>
                </div>
                <ul className="schema-list">
                  <li><code>title</code> (Text, Short)</li>
                  <li><code>description</code> (Text, Long)</li>
                  <li><code>content</code> (Rich Text / Blocks / Markdown)</li>
                  <li><code>slug</code> (UID, linked to <code>title</code>)</li>
                  <li><code>readTime</code> (Text, Short)</li>
                  <li><code>category</code> (Relation: 1-to-many, Article belongs to one Category)</li>
                  <li><code>image</code> (Media, Single Image)</li>
                </ul>
              </div>

              <div className="schema-roles-box">
                <strong>Important Authorization Note:</strong>
                <p>Go to <em>Settings &gt; Users &amp; Permissions Plugin &gt; Roles &gt; Public</em>. Under <strong>Article</strong> and <strong>Category</strong>, check <code>find</code> and <code>findOne</code> to allow anonymous REST requests.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
