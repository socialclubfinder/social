"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './AddClub.module.css';
import AdBanner from '@/components/AdBanner';


const countryData = {
  Germany: { code: '+49', placeholder: '+49 1234567890' },
  Spain: { code: '+34', placeholder: '+34 123456789' },
  Portugal: { code: '+351', placeholder: '+351 123 456 789' },
  Malta: { code: '+356', placeholder: '+356 12345678' },
  Switzerland: { code: '+41', placeholder: '+41 123 456 789' }
};

const AddClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    zipcode: '',
    city: '',
    country: 'Germany', // Default to Germany
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
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

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
    } else if (name === 'website') {
      const websiteValue = value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;
      setFormData(prevData => ({
        ...prevData,
        [name]: websiteValue,
      }));
    } else if (type === 'file') {
      const file = files[0];
      setFormData(prevData => ({
        ...prevData,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else if (name === 'phone') {
      setFormData(prevData => ({
        ...prevData,
        phone: value,
      }));
    } else if (name === 'country') {
      const selectedCountry = value;
      setFormData(prevData => ({
        ...prevData,
        country: selectedCountry,
        phone: countryData[selectedCountry].code + prevData.phone.replace(/^\+\d+/, '') // Adjust the phone number
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFormData(prevData => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
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

    const emailDomain = formData.email.split('@')[1];
    const websiteDomain = new URL(formData.website).hostname.replace(/^www\./, '');

    if (emailDomain !== websiteDomain) {
      alert(`Email domain (${emailDomain}) does not match website domain (${websiteDomain}).`);
      setSubmissionStatus(null);
      return;
    }

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
          continue;
        } else if (key === 'openingHours' || key === 'memberfee') {
          clubFormData.append(key, JSON.stringify(value));
        } else {
          clubFormData.append(key, value);
        }
      }

      clubFormData.append('image', imageCid);

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
        <h1 className={styles.heading}>❤️ Thanks for your submission!</h1>
        <div className={styles.successMessage}>
          <p>We will manually verify each submission.<br />Once verified, your club will be shown on our page</p>
          <Link href="/" className="text-blue-500 hover:underline">Back to Map</Link>
        </div>
      </div>
    );
  }

  if (submissionStatus === 'error') {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Oops! Something went wrong.</h1>
        <p>We're sorry, but we couldn't process your submission. Please try again later.</p>
        <p>If the error persists, please send an email to <a href="mailto:420@ganjacoin.com">420@ganjacoin.com</a>.</p>
      </div>
    );
  }

  return (
    
    <div className={styles.container}>
      <AdBanner/>
      <h1 className={styles.heading}>Add Club</h1>
      <div className="text-center mt-6">
      
        <p className="text-gray-700 leading-relaxed mb-4">
          We will manually verify each submission before listing, expect some waiting time
          </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} placeholder="Social Club Name" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} placeholder="Address" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Zipcode</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} className={styles.input} placeholder="Zipcode" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className={styles.input} placeholder="City" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Country</label>
          <select name="country" value={formData.country} onChange={handleChange} className={styles.select}>
            {Object.keys(countryData).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} className={styles.input} placeholder="mycsc.com" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="email" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone</label>
          <div className={styles.phoneGroup}>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`${styles.input} ${styles.countrySelect}`}
            >
              {Object.keys(countryData).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder={countryData[formData.country].placeholder}
            />
          </div>
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
          <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} maxLength="500" placeholder="Describe your social club" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image (.png,.jpg,.jpeg only)</label>
          <div
            className={styles.dragDropArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleFileInputClick}
          >
            <input
              type="file"
              name="image"
              onChange={handleChange}
              ref={fileInputRef}
              className={styles.fileInput}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <p className={styles.dragDropText}>Drag & drop an image here or click to select</p>
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Selected" className={styles.thumbnail} />
                <p className={styles.filename}>{formData.image.name}</p>
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Member Fee</label>
          <div className={styles.feeInputs}>
            <input
              type="number"
              name="memberfee.amount"
              placeholder="amount"
              value={formData.memberfee.amount}
              onChange={handleChange}
              className={`${styles.input} ${styles.feeInput}`}
              step="1"
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
