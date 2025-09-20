import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Topbar from "../ui/header";
import ProfileHeader from "../ui/ProfileHeader";
import BadgeCarousel from "../ui/BadgeCarousel";
import StoriesGrid from "../ui/StoriesGrid";
import SavedDiscoveries from "../ui/SavedDiscoveries";
import {
  User as UserIcon,
  Award,
  Image,
  Bookmark,
} from "lucide-react";

// ---- Tabs Implementation ----
const Tabs = ({ value, onValueChange, children }) => {
  const [active, setActive] = useState(value);
  const handleChange = (val) => {
    setActive(val);
    onValueChange(val);
  };

  const tabsList = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsList"
  );
  const tabsContent = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsContent"
  );

  return (
    <div>
      {tabsList.map((child) =>
        React.cloneElement(child, { active, onChange: handleChange })
      )}
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
      className={`flex items-center space-x-2 px-3 py-2 w-full justify-center transition-colors duration-200
        ${isActive ? "bg-orange-100 text-orange-700 shadow-sm" : "text-gray-600 hover:text-orange-600"} 
        ${className}`}
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-6"
  >
    {children}
  </motion.div>
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
  const [activePage, setActivePage] = useState("profile");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userData = await import("../data/user.json");
      const progressData = await import("../data/progress.json");
      const storiesData = await import("../data/stories.json");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDEBD0] to-[#F6D0A9]">
      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Topbar active={activePage} onNavigate={setActivePage} />
      </div>

      {/* Main content with padding to avoid overlap */}
      <div className="pt-20 px-4 sm:px-6 pb-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <ProfileHeader
            user={user}
            userProgress={userProgress}
            onEdit={() => setActiveTab("settings")}
          />
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-md p-4 sm:p-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
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
            </TabsList>

            {/* Overview */}
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

            {/* Stories */}
            <TabsContent value="stories">
              <StoriesGrid
                stories={userStories}
                onAddStory={handleAddStory}
                onEditStory={handleEditStory}
                onDeleteStory={handleDeleteStory}
              />
            </TabsContent>

            {/* Badges */}
            <TabsContent value="badges">
              <BadgeCarousel badges={userBadges} />
            </TabsContent>

            {/* Discoveries */}
            <TabsContent value="discoveries">
              <SavedDiscoveries discoveries={savedDiscoveries} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
