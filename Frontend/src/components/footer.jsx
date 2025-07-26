
import { NavLink } from 'react-router';
import { Github, Linkedin, X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl from-black to-gray-600 text-base-content border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info Section */}
        <div className="col-span-1">
          <h6 className="footer-title">CodeDrill</h6>
          <p className="text-sm text-gray-400 mt-2">
            A platform for competitive programming, designed to help you hone your coding skills and prepare for technical interviews.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/anoobhov/codedrill" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://x.com/AnubhavRaj_21" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <X size={24} />
            </a>
          </div>
        </div>

        {/* Explore Section */}
        <div className="col-span-1">
          <h6 className="footer-title">Explore</h6>
          <div className="flex flex-col gap-2 mt-2">
            <NavLink to="/problemset" className="link link-hover text-gray-400 hover:text-white transition-colors">Problem Set</NavLink>
            <NavLink to="/contests" className="link link-hover text-gray-400 hover:text-white transition-colors">Contests</NavLink>
            <NavLink to="/learn" className="link link-hover text-gray-400 hover:text-white transition-colors">Learning Path</NavLink>
            
          </div>
        </div>
        
        {/* Support Section */}
        <div className="col-span-1">
          <h6 className="footer-title">Support</h6>
          <div className="flex flex-col gap-2 mt-2">
            <NavLink to="/help" className="link link-hover text-gray-400 hover:text-white transition-colors">Help Center</NavLink>
            <NavLink to="/community" className="link link-hover text-gray-400 hover:text-white transition-colors">Community Forum</NavLink>
            <NavLink to="/report-bug" className="link link-hover text-gray-400 hover:text-white transition-colors">Report a Bug</NavLink>
            <NavLink to="/faq" className="link link-hover text-gray-400 hover:text-white transition-colors">FAQ</NavLink>
          </div>
        </div>
        
        {/* About Section */}
        <div className="col-span-1">
          <h6 className="footer-title">About</h6>
          <div className="flex flex-col gap-2 mt-2">
            <NavLink to="/about" className="link link-hover text-gray-400 hover:text-white transition-colors">About Us</NavLink>
            <NavLink to="/careers" className="link link-hover text-gray-400 hover:text-white transition-colors">Careers</NavLink>
            <NavLink to="/terms" className="link link-hover text-gray-400 hover:text-white transition-colors">Terms of Service</NavLink>
            <NavLink to="/privacy" className="link link-hover text-gray-400 hover:text-white transition-colors">Privacy Policy</NavLink>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer Section */}
      <div className=" text-gray-400 py-4 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} CodeDrill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;