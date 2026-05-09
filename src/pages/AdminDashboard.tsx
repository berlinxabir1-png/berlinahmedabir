import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Zap, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Save, 
  Lock, 
  LogOut,
  Image as ImageIcon,
  Globe,
  Github,
  Palette
} from 'lucide-react';
import { cn } from '../utils';

const ADMIN_PASSWORD = "berlin_admin"; // In a real app, this would be a real hash or service

export const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills'>('profile');
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_logged_in');
    if (saved === 'true') setIsLoggedIn(true);
    
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profRes, projRes, skillRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/projects'),
        fetch('/api/skills')
      ]);
      
      setProfile(await profRes.json());
      setProjects(await projRes.json());
      setSkills(await skillRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged_in', 'true');
    } else {
      alert("Invalid Password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
  };

  const saveProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) alert("Profile Saved!");
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  const saveProject = async (project: any) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        alert("Project Saved!");
        fetchData();
      }
    } catch (err) {
      alert("Failed to save project");
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Project Deleted!");
        fetchData();
      }
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const addNewProject = () => {
    const newProj = {
      title: "New Project",
      description: "Project Description",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      tags: ["React"],
      github: "https://github.com",
      live: "https://live.com",
      color: "bg-blue-500",
      type: "Web App"
    };
    setProjects([newProj, ...projects]);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-ios-bg-light flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md ios-glass p-8 rounded-[2rem] border-white/40 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-[22%] bg-ios-blue flex items-center justify-center text-white mb-4 shadow-lg">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-black">Admin Access</h1>
            <p className="text-ios-gray text-sm font-medium">Please enter your password</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-ios-blue transition-all font-medium"
              autoFocus
            />
            <button 
              type="submit"
              className="w-full py-4 rounded-2xl bg-ios-blue text-white font-bold shadow-lg shadow-ios-blue/20 active:scale-[0.98] transition-transform"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ios-bg-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-white/60 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-[22%] bg-ios-blue flex items-center justify-center text-white shadow-md">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="font-bold text-black leading-tight">Admin Console</h1>
              <p className="text-[10px] text-ios-gray font-black uppercase tracking-widest leading-none">Management Studio</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:space-y-4">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 sm:gap-4 no-scrollbar">
              <button 
                onClick={() => setActiveTab('profile')}
                className={cn(
                  "flex-shrink-0 flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all font-bold",
                  activeTab === 'profile' ? "bg-ios-blue text-white shadow-lg shadow-ios-blue/20" : "bg-white/60 text-ios-gray hover:bg-white"
                )}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <User size={18} />
                  <span className="text-sm sm:text-base">Profile</span>
                </div>
                <ChevronRight size={14} className="hidden lg:block opacity-50" />
              </button>
              
              <button 
                onClick={() => setActiveTab('projects')}
                className={cn(
                  "flex-shrink-0 flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all font-bold",
                  activeTab === 'projects' ? "bg-ios-blue text-white shadow-lg shadow-ios-blue/20" : "bg-white/60 text-ios-gray hover:bg-white"
                )}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Briefcase size={18} />
                  <span className="text-sm sm:text-base">Projects</span>
                </div>
                <ChevronRight size={14} className="hidden lg:block opacity-50" />
              </button>
              
              <button 
                onClick={() => setActiveTab('skills')}
                className={cn(
                  "flex-shrink-0 flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all font-bold",
                  activeTab === 'skills' ? "bg-ios-blue text-white shadow-lg shadow-ios-blue/20" : "bg-white/60 text-ios-gray hover:bg-white"
                )}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Zap size={18} />
                  <span className="text-sm sm:text-base">Skills</span>
                </div>
                <ChevronRight size={14} className="hidden lg:block opacity-50" />
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <main>
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="flex items-center justify-center p-20">
                  <div className="w-12 h-12 border-4 border-ios-blue/20 border-t-ios-blue rounded-full animate-spin" />
                </div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {activeTab === 'profile' && profile && (
                    <div className="ios-card bg-white p-8">
                       <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                        <h2 className="text-2xl font-bold text-black flex items-center">
                          <User className="mr-3 text-ios-blue" /> Edit Profile
                        </h2>
                        <button 
                          onClick={saveProfile}
                          className="flex items-center space-x-2 px-6 py-3 bg-ios-blue text-white rounded-xl font-bold shadow-lg shadow-ios-blue/20 active:scale-95 transition-transform"
                        >
                          <Save size={18} />
                          <span>Save Changes</span>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Display Name</span>
                            <input 
                              value={profile.name}
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Tagline</span>
                            <input 
                              value={profile.tagline}
                              onChange={(e) => setProfile({...profile, tagline: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Availability</span>
                            <input 
                              value={profile.availability}
                              onChange={(e) => setProfile({...profile, availability: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Profile Image URL</span>
                            <input 
                              value={profile.profile_image}
                              onChange={(e) => setProfile({...profile, profile_image: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                        </div>
                        <div className="space-y-4">
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Description</span>
                            <textarea 
                              rows={4}
                              value={profile.description}
                              onChange={(e) => setProfile({...profile, description: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold resize-none"
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Birthday (YYYY-MM-DD)</span>
                            <input 
                              type="date"
                              value={profile.birthday}
                              onChange={(e) => setProfile({...profile, birthday: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                           <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-ios-gray ml-2">Projects Count Display</span>
                            <input 
                              value={profile.projects_count}
                              onChange={(e) => setProfile({...profile, projects_count: e.target.value})}
                              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-black flex items-center">
                          <Briefcase className="mr-3 text-ios-blue" /> Manage Projects
                        </h2>
                        <button 
                          onClick={addNewProject}
                          className="flex items-center space-x-2 px-6 py-3 bg-white text-ios-blue rounded-xl font-bold shadow-sm border border-black/5 hover:bg-ios-blue hover:text-white transition-all"
                        >
                          <Plus size={18} />
                          <span>Add New</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {projects.map((project, idx) => (
                          <div key={project.id || idx} className="ios-card bg-white p-6 relative group">
                            <div className="grid md:grid-cols-[200px_1fr] gap-8">
                              <div className="space-y-4">
                                <div className="aspect-video rounded-2xl overflow-hidden bg-black/5 relative">
                                  <img src={project.image} alt="" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <ImageIcon className="text-white" />
                                  </div>
                                </div>
                                <input 
                                  placeholder="Image URL"
                                  value={project.image}
                                  onChange={(e) => {
                                    const newProj = [...projects];
                                    newProj[idx].image = e.target.value;
                                    setProjects(newProj);
                                  }}
                                  className="w-full px-4 py-2 rounded-xl bg-black/5 text-[10px] font-bold"
                                />
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex gap-4">
                                  <input 
                                    placeholder="Title"
                                    value={project.title}
                                    onChange={(e) => {
                                      const newProj = [...projects];
                                      newProj[idx].title = e.target.value;
                                      setProjects(newProj);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl bg-black/5 font-bold"
                                  />
                                  <input 
                                    placeholder="Type"
                                    value={project.type}
                                    onChange={(e) => {
                                      const newProj = [...projects];
                                      newProj[idx].type = e.target.value;
                                      setProjects(newProj);
                                    }}
                                    className="w-32 px-4 py-3 rounded-xl bg-black/5 font-bold text-ios-gray"
                                  />
                                </div>
                                <textarea 
                                  placeholder="Description"
                                  rows={2}
                                  value={project.description}
                                  onChange={(e) => {
                                    const newProj = [...projects];
                                    newProj[idx].description = e.target.value;
                                    setProjects(newProj);
                                  }}
                                  className="w-full px-4 py-3 rounded-xl bg-black/5 font-medium text-sm resize-none"
                                />
                                <div className="flex gap-4">
                                  <div className="flex items-center flex-1 space-x-2 px-4 py-2 rounded-xl bg-black/5">
                                    <Github size={14} className="text-ios-gray" />
                                    <input 
                                      placeholder="Github Link"
                                      value={project.github}
                                      onChange={(e) => {
                                        const newProj = [...projects];
                                        newProj[idx].github = e.target.value;
                                        setProjects(newProj);
                                      }}
                                      className="bg-transparent w-full text-xs font-medium focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center flex-1 space-x-2 px-4 py-2 rounded-xl bg-black/5">
                                    <Globe size={14} className="text-ios-gray" />
                                    <input 
                                      placeholder="Live Link"
                                      value={project.live}
                                      onChange={(e) => {
                                        const newProj = [...projects];
                                        newProj[idx].live = e.target.value;
                                        setProjects(newProj);
                                      }}
                                      className="bg-transparent w-full text-xs font-medium focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-black/5">
                                    <Palette size={14} className="text-ios-gray" />
                                    <input 
                                      placeholder="Color Class"
                                      value={project.color}
                                      onChange={(e) => {
                                        const newProj = [...projects];
                                        newProj[idx].color = e.target.value;
                                        setProjects(newProj);
                                      }}
                                      className="bg-transparent w-20 text-xs font-medium focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-4 border-t border-black/5 pt-4">
                              <button 
                                onClick={() => deleteProject(project.id)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                              <button 
                                onClick={() => saveProject(project)}
                                className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl font-bold active:scale-95 transition-transform"
                              >
                                <Save size={18} />
                                <span>Save Project</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="ios-card bg-white p-8">
                       <h2 className="text-2xl font-bold text-black mb-8 pb-4 border-b border-black/5 flex items-center">
                        <Zap className="mr-3 text-ios-blue" /> Skills & Expertise
                      </h2>
                      <div className="grid gap-6">
                        {skills.map((skill, idx) => (
                          <div key={skill.id || idx} className="flex items-center gap-6 p-4 rounded-2xl border border-black/5">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", skill.bg)}>
                              <input 
                                value={skill.icon}
                                onChange={(e) => {
                                  const newSkills = [...skills];
                                  newSkills[idx].icon = e.target.value;
                                  setSkills(newSkills);
                                }}
                                className="bg-transparent w-full text-center text-xs focus:outline-none"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between items-center">
                                <input 
                                  value={skill.name}
                                  onChange={(e) => {
                                    const newSkills = [...skills];
                                    newSkills[idx].name = e.target.value;
                                    setSkills(newSkills);
                                  }}
                                  className="font-bold bg-transparent text-black"
                                />
                                <div className="flex items-center space-x-2">
                                   <input 
                                    type="number"
                                    value={skill.percentage}
                                    onChange={(e) => {
                                      const newSkills = [...skills];
                                      newSkills[idx].percentage = parseInt(e.target.value);
                                      setSkills(newSkills);
                                    }}
                                    className="w-16 font-black text-ios-blue text-right bg-transparent"
                                  />
                                  <span className="text-ios-blue font-black">%</span>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                                <div className={cn("h-full transition-all duration-1000", skill.color)} style={{ width: `${skill.percentage}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
      
      {/* Mobile Footer Spacing */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};
