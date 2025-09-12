import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    newsletter: true,
    promotions: false,
    sms: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "USD",
    timezone: "EST",
    theme: "light",
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    // Save profile logic here
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const handleChangePassword = (e) => {
    e?.preventDefault();
    // Change password logic here
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password changed");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSavePreferences = (e) => {
    e?.preventDefault();
    // Save preferences logic here
    console.log("Preferences saved:", preferences);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "User" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "preferences", label: "Preferences", icon: "Settings" },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg  font-semibold">Personal Information</h3>
        <Button
          variant={isEditing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <form onSubmit={handleSaveProfile}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <Input
              type="text"
              value={profileData?.firstName}
              onChange={(e) =>
                handleProfileChange("firstName", e?.target?.value)
              }
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <Input
              type="text"
              value={profileData?.lastName}
              onChange={(e) =>
                handleProfileChange("lastName", e?.target?.value)
              }
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={profileData?.email}
              onChange={(e) => handleProfileChange("email", e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={profileData?.phone}
              onChange={(e) => handleProfileChange("phone", e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              value={profileData?.dateOfBirth}
              onChange={(e) =>
                handleProfileChange("dateOfBirth", e?.target?.value)
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={profileData?.gender}
              onChange={(e) => handleProfileChange("gender", e?.target?.value)}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="mt-8">
          <h4 className="text-md  font-semibold mb-4">
            Communication Preferences
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">
                  Newsletter Subscription
                </p>
                <p className="text-sm text-gray-600">
                  Receive our weekly newsletter with latest updates
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData?.newsletter}
                onChange={(e) =>
                  handleProfileChange("newsletter", e?.target?.checked)
                }
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">Promotional Offers</p>
                <p className="text-sm text-gray-600">
                  Get notified about sales and special offers
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData?.promotions}
                onChange={(e) =>
                  handleProfileChange("promotions", e?.target?.checked)
                }
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive order updates via SMS
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData?.sms}
                onChange={(e) => handleProfileChange("sms", e?.target?.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        )}
      </form>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h3 className="text-lg  font-semibold">Security Settings</h3>

      {/* Change Password */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-md  font-semibold mb-4">Change Password</h4>
        <form onSubmit={handleChangePassword}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <Input
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e?.target?.value)
                }
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e?.target?.value)
                }
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e?.target?.value)
                }
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>
          </div>

          <Button type="submit" className="mt-6">
            Update Password
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-md  font-semibold">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button variant="outline" size="sm">
            Enable 2FA
          </Button>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-md  font-semibold mb-4">Recent Login Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" size={20} className="text-gray-500" />
              <div>
                <p className="font-coder text-sm font-medium">
                  Desktop - Chrome
                </p>
                <p className="text-xs text-gray-500">
                  New York, NY • Current session
                </p>
              </div>
            </div>
            <span className="text-xs text-green-600 font-medium">Active</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-gray-500" />
              <div>
                <p className="font-coder text-sm font-medium">
                  Mobile - Safari
                </p>
                <p className="text-xs text-gray-500">
                  New York, NY • 2 hours ago
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <h3 className="text-lg  font-semibold">App Preferences</h3>

      <form onSubmit={handleSavePreferences}>
        {/* General Preferences */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="text-md  font-semibold mb-4">General</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={preferences?.language}
                onChange={(e) =>
                  handlePreferenceChange("language", e?.target?.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={preferences?.currency}
                onChange={(e) =>
                  handlePreferenceChange("currency", e?.target?.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={preferences?.timezone}
                onChange={(e) =>
                  handlePreferenceChange("timezone", e?.target?.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="EST">Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="MST">Mountain Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={preferences?.theme}
                onChange={(e) =>
                  handlePreferenceChange("theme", e?.target?.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="text-md  font-semibold mb-4">Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.emailNotifications}
                onChange={(e) =>
                  handlePreferenceChange(
                    "emailNotifications",
                    e?.target?.checked
                  )
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive push notifications on your device
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.pushNotifications}
                onChange={(e) =>
                  handlePreferenceChange(
                    "pushNotifications",
                    e?.target?.checked
                  )
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">Order Updates</p>
                <p className="text-sm text-gray-600">
                  Get notified about your order status
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.orderUpdates}
                onChange={(e) =>
                  handlePreferenceChange("orderUpdates", e?.target?.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-coder font-medium">Promotional Emails</p>
                <p className="text-sm text-gray-600">
                  Receive emails about sales and offers
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.promotionalEmails}
                onChange={(e) =>
                  handlePreferenceChange(
                    "promotionalEmails",
                    e?.target?.checked
                  )
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Preferences</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="p-6 font-coder">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl  font-bold text-gray-900 mb-2">
          Profile Settings
        </h2>
        <p className="text-gray-600 font-coder">
          Update your personal information and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab?.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        {activeTab === "personal" && renderPersonalInfo()}
        {activeTab === "security" && renderSecurity()}
        {activeTab === "preferences" && renderPreferences()}
      </div>
    </div>
  );
};

export default ProfileSettings;
