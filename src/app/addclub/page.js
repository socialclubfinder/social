"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import styles from './AddClub.module.css';

const AddClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
    website: '',
    email: '',
    phone: '',
    openingHours: {
      Monday: { isOpen: false, open: '09:00', close: '17:00' },
      Tuesday: { isOpen: false, open: '09:00', close: '17:00' },
      Wednesday: { isOpen: false, open: '09:00', close: '17:00' },
      Thursday: { isOpen: false, open: '09:00', close: '17:00' },
      Friday: { isOpen: false, open: '09:00', close: '17:00' },
      Saturday: { isOpen: false, open: '09:00', close: '17:00' },
      Sunday: { isOpen: false, open: '09:00', close: '17:00' },
    },
    description: '',
    image: null,
    memberfee: {
      amount: '',
      currency: 'USD',
      feeType: 'one-time',
    },
    latitude: '',
    longitude: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name.startsWith('memberfee.')) {
      const key = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        memberfee: {
          ...prevData.memberfee,
          [key]: value,
        },
      }));
    } else if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      openingHours: {
        ...prevData.openingHours,
        [day]: {
          ...prevData.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      let imageCid = null;

      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
        }

        const uploadResult = await uploadResponse.json();
        imageCid = uploadResult.ipfsHash;
        console.log('Image uploaded to IPFS, hash:', imageCid);
      }

      const clubFormData = new FormData();
      
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'image') {
          continue; // Skip the image file, we'll use the IPFS hash instead
        } else if (key === 'openingHours' || key === 'memberfee') {
          clubFormData.append(key, JSON.stringify(value));
        } else {
          clubFormData.append(key, value);
        }
      }

      clubFormData.append('image', imageCid); // Use the IPFS hash as the image value

      const addClubResponse = await fetch('/api/add-club', {
        method: 'POST',
        body: clubFormData,
      });

      if (!addClubResponse.ok) {
        throw new Error('Failed to add club to database');
      }

      const addClubResult = await addClubResponse.text();
      console.log('Club added successfully:', addClubResult);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('error');
    }
  };

  if (submissionStatus === 'submitting') {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Submitting...</h1>
        <p>Please wait while we process your submission.</p>
      </div>
    );
  }

  if (submissionStatus === 'success') {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>❤️ Thank You!</h1>
        <div className={styles.successMessage}>
          <p>Thanks for your submission. We will send you an email for verification. Once verified, your club will be shown on our page within 24 hours.</p>
          <Link href="/" className="text-blue-500 hover:underline">
          Back to Map
        </Link>
        </div>
      </div>
    );
  }

  if (submissionStatus === 'error') {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Oops! Something went wrong.</h1>
        <p>We're sorry, but we couldn't process your submission. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
     <h1 className={styles.heading}>Add Club</h1>
      <div className="text-center mt-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          To list your club on SocialClubFinder.com, complete the form using an email from your club’s domain (e.g., name@myclub.com for myclub.com).
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          After submission, a confirmation email will be sent to your email. Click the verification link and your club will be listed on our site.
        </p>
      </div>


      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Zipcode</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} required />
        </div>
        
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Opening Hours</label>
          <div className={styles.openingHours}>
            {Object.entries(formData.openingHours).map(([day, hours]) => (
              <div key={day} className={styles.dayRow}>
                <label className={styles.dayLabel}>
                  <input
                    type="checkbox"
                    checked={hours.isOpen}
                    onChange={(e) => handleOpeningHoursChange(day, 'isOpen', e.target.checked)}
                    className={styles.dayCheckbox}
                  />
                  {day}
                </label>
                {hours.isOpen && (
                  <div className={styles.timeInputs}>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                      className={styles.timeInput}
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                      className={styles.timeInput}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} maxLength="200" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image</label>
          <input type="file" name="image" onChange={handleChange} className={styles.input} accept="image/*" />
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Member Fee</label>
          <div className={styles.feeInputs}>
            <input
              type="number"
              name="memberfee.amount"
              value={formData.memberfee.amount}
              onChange={handleChange}
              className={`${styles.input} ${styles.feeInput}`}
              step="0.01"
              min="0"
              required
            />
            <select
              name="memberfee.currency"
              value={formData.memberfee.currency}
              onChange={handleChange}
              className={`${styles.input} ${styles.currencySelect}`}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <select
              name="memberfee.feeType"
              value={formData.memberfee.feeType}
              onChange={handleChange}
              className={`${styles.input} ${styles.feeTypeSelect}`}
            >
              <option value="one-time">One-Time</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default AddClub;