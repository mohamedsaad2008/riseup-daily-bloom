
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Palette, 
  Target, 
  Bell, 
  Heart,
  Upload,
  Save,
  Trash2,
  Globe,
  Clock,
  Scale
} from 'lucide-react';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: 'Ahmed Hassan',
    age: '17',
    weightGoal: '55',
    currentWeight: '42'
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'english',
    fontSize: 'medium',
    timezone: 'casablanca',
    units: 'metric'
  });

  const [goals, setGoals] = useState({
    weightTarget: '55',
    dailyMeals: '4',
    waterGoal: '8',
    studyTarget: '3',
    workoutDays: '5'
  });

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    workoutReminders: true,
    waterIntake: true,
    mealTimes: true,
    prayerTimes: true,
    soundEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00'
  });

  const [motivation, setMotivation] = useState({
    quoteType: 'motivational',
    customAffirmation: ''
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and app preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="motivation" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Motivation
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your profile information and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
                    AH
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-weight">Current Weight (kg)</Label>
                  <Input
                    id="current-weight"
                    type="number"
                    value={profile.currentWeight}
                    onChange={(e) => setProfile({...profile, currentWeight: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-goal">Weight Goal (kg)</Label>
                  <Input
                    id="weight-goal"
                    type="number"
                    value={profile.weightGoal}
                    onChange={(e) => setProfile({...profile, weightGoal: e.target.value})}
                  />
                </div>
              </div>

              <Separator />

              {/* Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                <Button variant="outline">Change Password</Button>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* App Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                App Preferences
              </CardTitle>
              <CardDescription>
                Customize your app experience and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">العربية</SelectItem>
                      <SelectItem value="french">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select value={preferences.fontSize} onValueChange={(value) => setPreferences({...preferences, fontSize: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Timezone
                  </Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casablanca">Casablanca (GMT+1)</SelectItem>
                      <SelectItem value="rabat">Rabat (GMT+1)</SelectItem>
                      <SelectItem value="marrakech">Marrakech (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Units
                  </Label>
                  <Select value={preferences.units} onValueChange={(value) => setPreferences({...preferences, units: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Settings */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Goal Settings
              </CardTitle>
              <CardDescription>
                Set and adjust your daily and weekly targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight-target">Weight Target (kg)</Label>
                  <Input
                    id="weight-target"
                    type="number"
                    value={goals.weightTarget}
                    onChange={(e) => setGoals({...goals, weightTarget: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">Your long-term weight goal</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daily-meals">Daily Meals Target</Label>
                  <Input
                    id="daily-meals"
                    type="number"
                    value={goals.dailyMeals}
                    onChange={(e) => setGoals({...goals, dailyMeals: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">Number of meals per day</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-goal">Water Goal (glasses)</Label>
                  <Input
                    id="water-goal"
                    type="number"
                    value={goals.waterGoal}
                    onChange={(e) => setGoals({...goals, waterGoal: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">Daily water intake target</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="study-target">Study Target (hours)</Label>
                  <Input
                    id="study-target"
                    type="number"
                    value={goals.studyTarget}
                    onChange={(e) => setGoals({...goals, studyTarget: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">Daily study hours</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-days">Workout Days/Week</Label>
                  <Input
                    id="workout-days"
                    type="number"
                    max="7"
                    value={goals.workoutDays}
                    onChange={(e) => setGoals({...goals, workoutDays: e.target.value})}
                  />
                  <p className="text-sm text-gray-500">How many days per week</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Update Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Control when and how you receive reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Reminder Types</h3>
                
                {[
                  { key: 'studyReminders', label: 'Study Reminders', desc: 'Get notified about study sessions' },
                  { key: 'workoutReminders', label: 'Workout Reminders', desc: 'Daily workout notifications' },
                  { key: 'waterIntake', label: 'Water Intake', desc: 'Hydration reminders' },
                  { key: 'mealTimes', label: 'Meal Times', desc: 'Meal reminder notifications' },
                  { key: 'prayerTimes', label: 'Prayer Times', desc: 'Islamic prayer reminders' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-gray-500">{desc}</div>
                    </div>
                    <Switch
                      checked={notifications[key as keyof typeof notifications] as boolean}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, [key]: checked})
                      }
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sound & Timing</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sound Enabled</div>
                    <div className="text-sm text-gray-500">Play sounds with notifications</div>
                  </div>
                  <Switch
                    checked={notifications.soundEnabled}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, soundEnabled: checked})
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      value={notifications.quietHoursStart}
                      onChange={(e) => setNotifications({...notifications, quietHoursStart: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">Quiet Hours End</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      value={notifications.quietHoursEnd}
                      onChange={(e) => setNotifications({...notifications, quietHoursEnd: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motivation */}
        <TabsContent value="motivation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Mindset & Motivation
              </CardTitle>
              <CardDescription>
                Personalize your daily inspiration and motivation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Daily Quote Type</Label>
                  <Select value={motivation.quoteType} onValueChange={(value) => setMotivation({...motivation, quoteType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motivational">Motivational Quotes</SelectItem>
                      <SelectItem value="islamic">Islamic Hadith & Verses</SelectItem>
                      <SelectItem value="success">Success & Achievement</SelectItem>
                      <SelectItem value="student">Student Life Motivation</SelectItem>
                      <SelectItem value="custom">Custom Affirmations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-affirmation">Custom Affirmation</Label>
                  <Textarea
                    id="custom-affirmation"
                    placeholder="Write your personal affirmation or goal statement..."
                    value={motivation.customAffirmation}
                    onChange={(e) => setMotivation({...motivation, customAffirmation: e.target.value})}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">This will appear on your dashboard when custom quotes are selected</p>
                </div>

                <div className="space-y-2">
                  <Label>Vision Board</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload an image that represents your goals</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Motivation Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
