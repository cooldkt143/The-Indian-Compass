import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../ui/ProfileHeader";
import BadgeCarousel from "../ui/BadgeCarousel";
import StoriesGrid from "../ui/StoriesGrid";
import SavedDiscoveries from "../ui/SavedDiscoveries";
import SettingsPanel from "../ui/SettingsPanel";
import { 
  User as UserIcon, Award, Image, Bookmark, Settings
} from "lucide-react";

// ---- Simple Tabs Implementation ----
const Tabs = ({ value, onValueChange, children }) => {
  const [active, setActive] = useState(value);
  const handleChange = (val) => {
    setActive(val);
    onValueChange(val);
  };

  // Separate TabsList and TabsContent
  const tabsList = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsList"
  );
  const tabsContent = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsContent"
  );

  return (
    <div>
      {tabsList.map((child) => React.cloneElement(child, { active, onChange: handleChange }))}
      {tabsContent.map((child) =>
        child.props.value === active ? child : null
      )}
    </div>
  );
};

const TabsList = ({ children, active, onChange, className }) => (
  <div className={className}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { active, onChange })
    )}
  </div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, children, active, onChange, className }) => {
  const isActive = active === value;
  return (
    <button
      onClick={() => onChange(value)}
      className={`flex items-center space-x-2 px-3 py-2 w-full justify-center 
        ${isActive ? "bg-orange-100 text-orange-700" : "text-gray-600"} 
        ${className}`}
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ children }) => (
  <div className="mt-6">{children}</div>
);
TabsContent.displayName = "TabsContent";

// ---- Main Profile Component ----
function Profile() {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [savedDiscoveries, setSavedDiscoveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userData = await import("../data/user.json");
      const progressData = await import("../data/progress.json");
      const storiesData = await import("../data/stories.json");
      const badgesData = await import("../data/badges.json");
      const discoveriesData = await import("../data/discoveries.json");

      setUser(userData.default);
      setUserProgress(progressData.default);
      setUserStories(storiesData.default);
      setUserBadges(badgesData.default);
      setSavedDiscoveries(discoveriesData.default);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStory = () => alert("Add story clicked");
  const handleEditStory = (story) => alert("Edit story: " + story.title);
  const handleDeleteStory = (id) =>
    setUserStories((prev) => prev.filter((s) => s.id !== id));

  const handleUpdateSettings = (settings) =>
    alert("Settings updated: " + JSON.stringify(settings));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProfileHeader
          user={user}
          userProgress={userProgress}
          onEdit={() => setActiveTab("settings")}
        />

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-white shadow-sm">
              <TabsTrigger value="overview">
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="stories">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">My Stories</span>
              </TabsTrigger>
              <TabsTrigger value="badges">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Badges</span>
              </TabsTrigger>
              <TabsTrigger value="discoveries">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved Discoveries</span>
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-8">
                <BadgeCarousel badges={userBadges} />
                <div className="grid lg:grid-cols-2 gap-8">
                  <StoriesGrid
                    stories={userStories.slice(0, 6)}
                    onAddStory={handleAddStory}
                    onEditStory={handleEditStory}
                    onDeleteStory={handleDeleteStory}
                  />
                  <SavedDiscoveries discoveries={savedDiscoveries.slice(0, 6)} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stories">
              <StoriesGrid
                stories={userStories}
                onAddStory={handleAddStory}
                onEditStory={handleEditStory}
                onDeleteStory={handleDeleteStory}
              />
            </TabsContent>

            <TabsContent value="badges">
              <BadgeCarousel badges={userBadges} />
            </TabsContent>

            <TabsContent value="discoveries">
              <SavedDiscoveries discoveries={savedDiscoveries} />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsPanel user={user} onUpdateSettings={handleUpdateSettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
