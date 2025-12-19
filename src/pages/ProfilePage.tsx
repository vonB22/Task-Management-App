import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit2, Save, X, Camera } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  avatar?: string;
}

export const ProfilePage: React.FC = () => {
  const { success } = useToast();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'Guest User',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    joinDate: user?.createdAt || new Date().toISOString().split('T')[0],
    avatar: user?.avatar,
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  // Update profile when user changes
  useEffect(() => {
    if (user) {
      const updatedProfile = {
        name: user.name || 'Guest User',
        email: user.email || '',
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        joinDate: user.createdAt || new Date().toISOString().split('T')[0],
        avatar: user.avatar,
      };
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    // Update user in auth context
    if (user && updateUser) {
      updateUser({
        ...user,
        name: editedProfile.name,
        email: editedProfile.email,
        avatar: editedProfile.avatar,
      });
    }
    setIsEditing(false);
    success('Profile updated successfully');
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Tasks Completed', value: '247', color: 'text-green-600 dark:text-green-400' },
    { label: 'Active Projects', value: '12', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Team Members', value: '8', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Streak Days', value: '45', color: 'text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Manage your personal information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} variant="primary" size="sm">
            <Edit2 size={16} />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="secondary" size="sm">
              <X size={16} />
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary" size="sm">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                {editedProfile.avatar ? (
                  <img
                    src={editedProfile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {profile.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={(ref) => ref && (fileInputRef as any) && ((fileInputRef as any).current = ref)}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <motion.label
                    htmlFor="avatar-upload"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                  >
                    <Camera size={18} />
                  </motion.label>
                </>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Member since</p>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {new Date(profile.joinDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <User size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-neutral-900 dark:text-white font-medium">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-neutral-900 dark:text-white font-medium">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone"
                  />
                ) : (
                  <p className="text-neutral-900 dark:text-white font-medium">{profile.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Enter your location"
                  />
                ) : (
                  <p className="text-neutral-900 dark:text-white font-medium">{profile.location}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Edit2 size={16} />
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 transition-colors duration-150 resize-none"
                />
              ) : (
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Section */}
      <Card>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'Completed task', task: 'Complete project proposal', time: '2 hours ago' },
            { action: 'Created task', task: 'Schedule team meeting', time: '5 hours ago' },
            { action: 'Updated task', task: 'Review design mockups', time: '1 day ago' },
            { action: 'Completed task', task: 'Buy groceries', time: '2 days ago' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900 dark:text-white font-medium">
                  {activity.action}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {activity.task}
                </p>
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
