"use client";

import React, { useState, useEffect } from "react";
import { Save, Bell, Shield, Globe, Palette } from "lucide-react";
import FooterServicesSection, { Service } from "@/components/admin/FooterService";
import AboutUsSection from "@/components/admin/AboutUsSection";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ||
      "https://api.fastservices4u.com/test/api" ;
      // "http://localhost:3001/test/api";

const defaultSettings = {
  siteName: "Fast Services",
  siteDescription: "Premium Home Services in Dubai",
  contactEmail: "info@fastservices.com",
  contactPhone: "+971 12 345 6789",
  address: "Business Bay, Dubai, UAE",
  enableNotifications: true,
  enableBookingEmails: true,
  enableReviewEmails: true,
  maintenanceMode: false,
  allowGuestBooking: true,
  aboutUs: { paragraphs: [""] },
  requireEmailVerification: false,
  maxBookingsPerDay: 50,
  primaryColor: "#339C5E",
  secondaryColor: "#002F13",
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [footerServices, setFooterServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/settings`);
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        // merge with defaults to avoid missing keys
        setSettings({ ...defaultSettings, ...data });
        setFooterServices(data.footerServices || []);
      } catch (err) {
        console.error("Failed to load settings:", err);
        // keep defaultSettings if fetch fails
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, footerServices }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save settings");
      }
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!settings) return <p>Failed to load settings</p>;

    const Toggle = ({
      checked,
      onChange,
    }: {
      checked: boolean;
      onChange: (checked: boolean) => void;
    }) => (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    );

  return (
    <div>
      <AboutUsSection
        initialData={settings.aboutUs}
        onChange={(newAboutUs) =>
          setSettings((s: any) => ({ ...s, aboutUs: newAboutUs }))
        }
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <Globe size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              General Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      siteName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      contactEmail: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings((s: any) => ({
                    ...s,
                    siteDescription: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      contactPhone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings((s: any) => ({ ...s, address: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <FooterServicesSection
          footerServices={footerServices}
          setFooterServices={setFooterServices}
        />

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <Bell size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Notification Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Enable Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Receive notifications for new bookings and messages
                </p>
              </div>
              <Toggle
                checked={!!settings.enableNotifications}
                onChange={(v) =>
                  setSettings((s: any) => ({ ...s, enableNotifications: v }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Booking Email Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Send email notifications for new bookings
                </p>
              </div>
              <Toggle
                checked={!!settings.enableBookingEmails}
                onChange={(v) =>
                  setSettings((s: any) => ({ ...s, enableBookingEmails: v }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Review Email Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Send email notifications when reviews are posted
                </p>
              </div>
              <Toggle
                checked={!!settings.enableReviewEmails}
                onChange={(v) =>
                  setSettings((s: any) => ({ ...s, enableReviewEmails: v }))
                }
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <Shield size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Security Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                <p className="text-sm text-gray-600">
                  Enable maintenance mode to temporarily disable the website
                </p>
              </div>
              <Toggle
                checked={!!settings.maintenanceMode}
                onChange={(v) =>
                  setSettings((s: any) => ({ ...s, maintenanceMode: v }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Allow Guest Booking
                </h3>
                <p className="text-sm text-gray-600">
                  Allow users to book services without creating an account
                </p>
              </div>
              <Toggle
                checked={!!settings.allowGuestBooking}
                onChange={(v) =>
                  setSettings((s: any) => ({ ...s, allowGuestBooking: v }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Require Email Verification
                </h3>
                <p className="text-sm text-gray-600">
                  Require email verification for new accounts
                </p>
              </div>
              <Toggle
                checked={!!settings.requireEmailVerification}
                onChange={(v) =>
                  setSettings((s: any) => ({
                    ...s,
                    requireEmailVerification: v,
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Bookings Per Day
              </label>
              <input
                type="number"
                min={0}
                value={settings.maxBookingsPerDay ?? 0}
                onChange={(e) =>
                  setSettings((s: any) => ({
                    ...s,
                    maxBookingsPerDay: Number(e.target.value),
                  }))
                }
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <Palette size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Appearance Settings
            </h2>
          </div>
          <div className="p-6 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      primaryColor: e.target.value,
                    }))
                  }
                  className="w-12 h-10 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      primaryColor: e.target.value,
                    }))
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      secondaryColor: e.target.value,
                    }))
                  }
                  className="w-12 h-10 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) =>
                    setSettings((s: any) => ({
                      ...s,
                      secondaryColor: e.target.value,
                    }))
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
