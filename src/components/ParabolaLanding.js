import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  BarChart3, 
  Brain, 
  Bot,
  Target,
  Play,
  TrendingUp,
  Zap,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Circle,
  Activity,
  Star,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  User
} from 'lucide-react';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Parabola</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">
              Join Beta - Free Forever
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"} // ACCESSIBILITY: Added aria-label
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#roadmap" className="block text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold">
              Join Beta - Free Forever
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- UPDATED Animated Section Component ---
// This component now uses the Intersection Observer API to trigger animations
// only when the element enters the viewport, improving performance.
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null); // Create a ref to attach to the DOM element

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is intersecting (visible)
        if (entry.isIntersecting) {
          // Set a timeout to respect the delay prop
          const timer = setTimeout(() => setIsVisible(true), delay);
          // Stop observing the element once it's visible to prevent re-triggering
          observer.unobserve(entry.target);
          // Cleanup the timeout on component unmount
          return () => clearTimeout(timer);
        }
      },
      {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    // Start observing the element if the ref is attached
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, delay]); // Rerun effect if ref or delay changes

  return (
    <div
      ref={ref} // Attach the ref to this div
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// NLP Animation Component
const NLPAnimation = () => {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  
  const fullText = "Review quarterly reports and prepare presentation";
  const tasks = [
    "Review Q4 financial reports",
    "Analyze quarterly metrics", 
    "Create Monday presentation"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (step === 0) {
      setText('');
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullText.length) {
          setText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    }
  }, [step]);
  
  return (
    <div className="bg-black/50 rounded-lg p-4 border border-gray-700 min-h-[160px]">
      {step === 0 && (
        <div className="space-y-3">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Natural Language Input:
          </div>
          <div className="bg-gray-800 rounded p-3 text-white border-l-4 border-blue-400">
            {text}
            <span className="animate-pulse text-blue-400">|</span>
          </div>
        </div>
      )}
      
      {step === 1 && (
        <div className="space-y-3">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <Brain className="w-4 h-4 animate-spin text-red-400" />
            AI Processing...
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded h-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(step === 2 || step === 3) && (
        <div className="space-y-3">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Tasks Extracted:
          </div>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <div key={i} className="bg-gray-800 rounded p-2 text-white text-sm flex items-center gap-2 border-l-2 border-green-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {task}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Step Component
const Step = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <AnimatedSection delay={delay}>
      <div className="text-center group cursor-pointer">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
};

// Main Component
const ParabolaLanding = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 opacity-20">
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-red-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection delay={200}>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300">Powered by Advanced AI</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Productivity
              </span>
              <br />
              Assistant
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your workflow with AI that understands natural language, 
              intelligently schedules your time, and adapts to your productivity patterns.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center gap-2">
                Join Beta - Free Forever
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={1000}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <a href="#features" aria-label="Scroll down">
                <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Beta Program Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Currently in Beta</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Join Our <span className="text-red-400">Beta Program</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                Be among the first to experience AI-powered productivity. Beta testers get lifetime free access 
                to Parabola and shape the future of intelligent task management.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Current Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Planner & Calendar</h3>
                <p className="text-sm text-gray-400">Intelligent task organization with calendar integration and scheduling optimization</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Available Now
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Pomodoro & Focus</h3>
                <p className="text-sm text-gray-400">Advanced focus sessions with breathing techniques and productivity tracking</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Available Now
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Notes</h3>
                <p className="text-sm text-gray-400">Basic note-taking with AI-powered organization and quick capture features</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Available Now
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* AI Demo Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                See AI in <span className="text-red-400">Action</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Watch how our AI transforms your natural language into structured, intelligently scheduled tasks
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={400}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Natural Language Processing</h3>
                </div>
                <NLPAnimation />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Features Bento Grid */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Everything You Need to
                <span className="text-red-400"> Maximize Focus</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Comprehensive tools powered by AI to transform how you work and manage your time
              </p>
            </div>
          </AnimatedSection>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-6 max-w-6xl mx-auto">
            {/* Large featured card - spans 2x2 */}
            <AnimatedSection delay={100}>
              <div className="bg-gradient-to-br from-red-500/5 to-red-600/5 border-red-500/30 backdrop-blur-sm border rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-2 md:row-span-2">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Natural Language Processing</h3>
                <p className="text-base text-gray-400 leading-relaxed">Simply describe what you need to do in plain English. Our advanced AI understands context, priorities, deadlines, and even your working style preferences.</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Real-time processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>99.9% accuracy rate</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>Multi-language support</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Wide card - spans 2x1 */}
            <AnimatedSection delay={200}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Intelligent Scheduling</h3>
                <p className="text-sm text-gray-400 leading-relaxed">AI analyzes your productivity patterns, energy levels, and calendar to schedule tasks at optimal times.</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" style={{width: '75%'}} />
                  </div>
                  <span className="text-xs text-gray-400">75% faster</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Normal card */}
            <AnimatedSection delay={300}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Smart Prioritization</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Automatically prioritizes tasks based on deadlines, importance, and your personal work patterns.</p>
              </div>
            </AnimatedSection>
            
            {/* Tall card - spans 1x2 */}
            <AnimatedSection delay={400}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:row-span-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Focus Tracking</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Monitor your deep work sessions, track focus quality, and get insights on when you're most productive throughout the day.</p>
              </div>
            </AnimatedSection>
            
            {/* Normal card */}
            <AnimatedSection delay={500}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Auto Time-boxing</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Intelligently breaks down large tasks into manageable time blocks with built-in buffers.</p>
              </div>
            </AnimatedSection>
            
            {/* Wide card - spans 2x1 */}
            <AnimatedSection delay={600}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Performance Analytics & Insights</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Get detailed insights, productivity trends, and AI-powered recommendations to continuously improve your workflow and maximize efficiency.</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" style={{width: '85%'}} />
                  </div>
                  <span className="text-xs text-gray-400">85% improvement</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Normal card */}
            <AnimatedSection delay={700}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group md:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">Smart Templates</h3>
                <p className="text-sm text-gray-400 leading-relaxed">AI-generated task templates based on your work patterns and industry best practices.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Simple, Yet <span className="text-red-400">Powerful</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get started in minutes and let AI handle the complexity of optimal scheduling
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Step
              icon={MessageSquare}
              title="Describe Your Tasks"
              description="Tell Parabola what you need to do in natural language"
              delay={200}
            />
            <Step
              icon={Brain}
              title="AI Processing"
              description="Our AI understands context, breaks down complex tasks, and estimates time"
              delay={400}
            />
            <Step
              icon={Calendar}
              title="Smart Scheduling"
              description="Tasks are intelligently scheduled based on your energy and availability"
              delay={600}
            />
            <Step
              icon={TrendingUp}
              title="Continuous Learning"
              description="The system learns from your patterns to improve future recommendations"
              delay={800}
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Product <span className="text-red-400">Roadmap</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                See what's coming next and help shape the future of AI-powered productivity
              </p>
            </div>
          </AnimatedSection>
          
          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-500 via-red-500 to-gray-600" />
            
            {/* Roadmap Items */}
            <div className="space-y-16">
              {/* Q4 2024 - Completed */}
              <AnimatedSection delay={200}>
                <div className="flex items-center">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 border border-green-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Completed</span>
                        <h3 className="text-lg font-semibold text-white">Q4 2024</h3>
                      </div>
                      <h4 className="text-red-400 font-medium mb-2">Core Foundation</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Smart Planner with Calendar Integration</li>
                        <li>• Advanced Pomodoro with Breathing Techniques</li>
                        <li>• Basic Notes & Quick Capture</li>
                        <li>• Beta Program Launch</li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-green-500 border-4 border-black rounded-full" />
                  <div className="flex-1 pl-8" />
                </div>
              </AnimatedSection>
              
              {/* Q1 2025 - In Progress */}
              <AnimatedSection delay={400}>
                <div className="flex items-center">
                  <div className="flex-1 pr-8" />
                  <div className="relative z-10 w-4 h-4 bg-red-500 border-4 border-black rounded-full animate-pulse" />
                  <div className="flex-1 pl-8">
                    <div className="bg-gradient-to-br from-red-500/5 to-red-600/5 border border-red-500/30 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-white">Q1 2025</h3>
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">In Progress</span>
                      </div>
                      <h4 className="text-red-400 font-medium mb-2">AI Enhancement</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Natural Language Task Processing</li>
                        <li>• Intelligent Auto-scheduling</li>
                        <li>• Productivity Pattern Analysis</li>
                        <li>• Smart Task Prioritization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Q2 2025 - Planned */}
              <AnimatedSection delay={600}>
                <div className="flex items-center">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Planned</span>
                        <h3 className="text-lg font-semibold text-white">Q2 2025</h3>
                      </div>
                      <h4 className="text-red-400 font-medium mb-2">Advanced Analytics</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Detailed Performance Insights</li>
                        <li>• Focus Quality Tracking</li>
                        <li>• Energy Level Optimization</li>
                        <li>• Custom Productivity Reports</li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-blue-500 border-4 border-black rounded-full opacity-70" />
                  <div className="flex-1 pl-8" />
                </div>
              </AnimatedSection>
              
              {/* Q3 2025 - Planned */}
              <AnimatedSection delay={800}>
                <div className="flex items-center">
                  <div className="flex-1 pr-8" />
                  <div className="relative z-10 w-4 h-4 bg-purple-500 border-4 border-black rounded-full opacity-50" />
                  <div className="flex-1 pl-8">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-white">Q3 2025</h3>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Future</span>
                      </div>
                      <h4 className="text-red-400 font-medium mb-2">Collaboration & Integration</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Team Collaboration Features</li>
                        <li>• Third-party App Integrations</li>
                        <li>• Advanced AI Templates</li>
                        <li>• Mobile App Launch</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Q4 2025 - Future */}
              <AnimatedSection delay={1000}>
                <div className="flex items-center">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full">Vision</span>
                        <h3 className="text-lg font-semibold text-white">Q4 2025</h3>
                      </div>
                      <h4 className="text-red-400 font-medium mb-2">Next-Gen AI</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Predictive Task Management</li>
                        <li>• Voice-powered Interface</li>
                        <li>• Advanced Learning Algorithms</li>
                        <li>• Enterprise Solutions</li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-gray-500 border-4 border-black rounded-full opacity-30" />
                  <div className="flex-1 pl-8" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Trusted by <span className="text-red-400">Beta Testers</span>
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={200}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Being part of the Parabola beta has been incredible. The smart planner and focus sessions have completely transformed my productivity, and I love being able to influence new features!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sarah Chen</div>
                    <div className="text-sm text-gray-400">Beta Tester & Product Manager</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The Pomodoro feature with breathing techniques is genius! As a beta tester, I get to try new features early and provide feedback. The team really listens to our suggestions."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Marcus Rodriguez</div>
                    <div className="text-sm text-gray-400">Beta Tester & Consultant</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Ready to <span className="text-red-400">Join</span> Our Beta Program?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our exclusive beta program and get lifetime free access to Parabola while helping shape the future of AI productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
                  Join Beta Program - FREE Forever
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                No credit card required • Free forever for beta testers • Shape the product roadmap
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Parabola</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Parabola AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParabolaLanding;
