import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Therapist',
    agreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agreement) return;

    setIsSubmitting(true);
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', role: 'Therapist', agreement: false });
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-header">
              <div className="icon-badge">
                <Sparkles size={24} className="sparkle-icon" />
              </div>
              <h2 className="booking-title">Start Your 7-Day Free Trial</h2>
              <p className="booking-description">
                Experience full-feature access to client messaging, automated billing, and calendar syncs. No credit card required.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="booking-name">Full Name</label>
              <input
                type="text"
                id="booking-name"
                required
                placeholder="Dr. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="booking-email">Work Email</label>
              <input
                type="email"
                id="booking-email"
                required
                placeholder="sarah@yourpractice.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="booking-role">Your Role</label>
              <select
                id="booking-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Therapist">Therapist / Practitioner</option>
                <option value="Administrator">Practice Manager / Admin</option>
                <option value="Clinical Director">Clinical Director</option>
                <option value="Patient">Patient / Client</option>
              </select>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="booking-agreement"
                required
                checked={formData.agreement}
                onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
              />
              <label htmlFor="booking-agreement">
                I agree to the Terms of Service and Privacy Policy, and consent to HIPAA-compliant logging.
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                'Create My Trial Account'
              )}
            </button>
          </form>
        ) : (
          <div className="booking-success">
            <CheckCircle size={64} className="success-icon" />
            <h2 className="success-title">You're All Set!</h2>
            <p className="success-description">
              We have sent a verification email to <strong>{formData.email}</strong>. Follow the instructions in the email to activate your workspace and start onboarding your clients.
            </p>
            <button className="success-close-btn" onClick={handleReset}>
              Go back to Learning Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
