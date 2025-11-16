
// import { useState, useEffect, useRef, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, User, ChevronDown, Search } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../auth/AuthContext";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdown, setDropdown] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   const openTimer = useRef(null);
//   const closeTimer = useRef(null);

//   const navigate = useNavigate();
//   const { isLoggedIn, logout } = useContext(AuthContext);

//   const suggestions = ["Dashboard", "Invoices", "Analytics", "Settings", "Profile"];
//   const filtered = query ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : [];

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleDropdownEnter = () => {
//     clearTimeout(closeTimer.current);
//     openTimer.current = setTimeout(() => setDropdown(true), 120);
//   };
//   const handleDropdownLeave = () => {
//     clearTimeout(openTimer.current);
//     closeTimer.current = setTimeout(() => setDropdown(false), 200);
//   };

//   useEffect(() => {
//     return () => {
//       clearTimeout(openTimer.current);
//       clearTimeout(closeTimer.current);
//     };
//   }, []);

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest("#profile-dropdown")) setProfileOpen(false);
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
//       <div className="w-full bg-white/30 backdrop-blur-lg border border-white/20 shadow-sm">
//         <div className="max-w-7xl mx-auto flex justify-around items-center px-4">
//           {/* Logo */}
//           <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} className="text-2xl md:text-3xl font-extrabold py-2">
//             <Link to="/" className="inline-block px-2">KDIS</Link>
//           </motion.div>

//           {/* Desktop links */}
//           <div className="hidden md:flex gap-8 items-center text-lg font-medium">
//             <div className="relative" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
//               <div className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-md hover:bg-white/10 transition">
//                 <span>Product</span>
//                 <ChevronDown size={16} />
//               </div>
//               <AnimatePresence>
//                 {dropdown && (
//                   <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="absolute left-0 mt-3 w-48 rounded-xl shadow-2xl p-2 bg-white text-black">
//                     <Link to="/product/overview" className="block px-4 py-2 rounded hover:bg-gray-100">Overview</Link>
//                     <Link to="/product/pricing" className="block px-4 py-2 rounded hover:bg-gray-100">Pricing</Link>
//                     <Link to="/product/integrations" className="block px-4 py-2 rounded hover:bg-gray-100">Integrations</Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             <Link to="/customer" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Customer</Link>
//             <Link to="/solutions" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Solutions</Link>
//           </div>

//           {/* Search + Auth */}
//           <div className="hidden md:flex items-center gap-4">
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
//               <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="pl-10 pr-3 py-2 rounded-full w-full bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-300" />
//               {filtered.length > 0 && (
//                 <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute left-0 mt-2 w-full rounded-lg bg-white shadow-lg overflow-hidden">
//                   {filtered.map((s) => <div key={s} onClick={() => setQuery(s)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{s}</div>)}
//                 </motion.div>
//               )}
//             </div>

//             {!isLoggedIn ? (
//               <Link to="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-95 transition">Sign In</Link>
//             ) : (
//               <div id="profile-dropdown" className="relative">
//                 <button onClick={() => setProfileOpen(p => !p)} className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
//                   <User size={20} />
//                   <ChevronDown size={16} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 <AnimatePresence>
//                   {profileOpen && (
//                     <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-40 rounded-xl shadow-2xl p-2 bg-white text-black">
//                       <button onClick={() => { logout(); setProfileOpen(false); navigate("/"); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Logout</button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu */}
//           <div className="md:hidden">
//             <button onClick={() => setOpen(s => !s)} aria-label="Toggle menu" className="p-2">{open ? <X size={26} /> : <Menu size={26} />}</button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {open && (
//             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="md:hidden bg-white/90 text-black shadow-lg">
//               <div className="px-4 py-4 space-y-3">
//                 <Link to="/" onClick={() => setOpen(false)} className="block py-2 font-medium">Home</Link>

//                 <details className="group">
//                   <summary className="cursor-pointer list-none py-2 flex items-center justify-between">
//                     <span>Product</span>
//                     <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
//                   </summary>
//                   <div className="pl-4 mt-2 space-y-1">
//                     <Link to="/product/overview" onClick={() => setOpen(false)} className="block py-1">Overview</Link>
//                     <Link to="/product/pricing" onClick={() => setOpen(false)} className="block py-1">Pricing</Link>
//                     <Link to="/product/integrations" onClick={() => setOpen(false)} className="block py-1">Integrations</Link>
//                   </div>
//                 </details>

//                 <Link to="/customer" onClick={() => setOpen(false)} className="block py-2">Customer</Link>
//                 <Link to="/solutions" onClick={() => setOpen(false)} className="block py-2">Solutions</Link>

//                 {!isLoggedIn ? (
//                   <Link to="/signin" onClick={() => setOpen(false)} className="block mt-3 w-full text-center py-2 bg-blue-600 text-white rounded-full">Sign In</Link>
//                 ) : (
//                   <button onClick={() => { logout(); setOpen(false); navigate("/"); }} className="block mt-3 w-full text-center py-2 bg-red-500 text-white rounded-full">Logout</button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  const suggestions = ["Dashboard", "Invoices", "Analytics", "Settings", "Profile"];
  const filtered = query ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : [];

  const handleDropdownEnter = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setDropdown(true), 120);
  };
  const handleDropdownLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 200);
  };

  useEffect(() => {
    return () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#profile-dropdown")) setProfileOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-lg border border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="font-extrabold text-2xl md:text-3xl">KDIS</Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-md hover:bg-white/10 transition">
              Product <ChevronDown size={16} />
            </div>
            <AnimatePresence>
              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 mt-2 w-48 rounded-xl shadow-2xl p-2 bg-white text-black"
                >
                  <Link to="/product/overview" className="block px-4 py-2 rounded hover:bg-gray-100">Overview</Link>
                  <Link to="/product/pricing" className="block px-4 py-2 rounded hover:bg-gray-100">Pricing</Link>
                  <Link to="/product/integrations" className="block px-4 py-2 rounded hover:bg-gray-100">Integrations</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/customer" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Customer</Link>
          <Link to="/solutions" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Solutions</Link>
        </div>

        {/* Search + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-3 py-2 rounded-full w-full bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {!isLoggedIn ? (
            <>
              <Link to="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-95 transition">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition">Sign Up</Link>
            </>
          ) : (
            <div id="profile-dropdown" className="relative">
              <button
                onClick={() => setProfileOpen(p => !p)}
                className="flex items-center gap-2 bg-gray-100 p-1 rounded-full"
              >
                <User size={20} />
                <ChevronDown size={16} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl shadow-2xl p-2 bg-white text-black"
                  >
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded">Dashboard</Link>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); navigate("/"); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded mt-1"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button onClick={() => setOpen(s => !s)} className="p-2">{open ? <X size={26} /> : <Menu size={26} />}</button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/90 text-black shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setOpen(false)} className="block py-2 font-medium">Home</Link>
              <details className="group">
                <summary className="cursor-pointer list-none py-2 flex items-center justify-between">
                  Product <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-4 mt-2 space-y-1">
                  <Link to="/product/overview" onClick={() => setOpen(false)} className="block py-1">Overview</Link>
                  <Link to="/product/pricing" onClick={() => setOpen(false)} className="block py-1">Pricing</Link>
                  <Link to="/product/integrations" onClick={() => setOpen(false)} className="block py-1">Integrations</Link>
                </div>
              </details>
              <Link to="/customer" onClick={() => setOpen(false)} className="block py-2">Customer</Link>
              <Link to="/solutions" onClick={() => setOpen(false)} className="block py-2">Solutions</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-2">Dashboard</Link>

              {!isLoggedIn ? (
                <>
                  <Link to="/signin" onClick={() => setOpen(false)} className="block mt-3 w-full text-center py-2 bg-blue-600 text-white rounded-full">Sign In</Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="block mt-2 w-full text-center py-2 bg-gray-200 text-black rounded-full">Sign Up</Link>
                </>
              ) : (
                <button
                  onClick={() => { logout(); setOpen(false); navigate("/"); }}
                  className="block mt-3 w-full text-center py-2 bg-red-500 text-white rounded-full"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}