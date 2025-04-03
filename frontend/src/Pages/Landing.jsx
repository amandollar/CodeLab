import { useEffect, useRef } from "react";

const Landing = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    document.title = "SyncGrid - Next-Gen Code Collaboration";

    // Simple scroll animation trigger
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          el.classList.add("animate-fadeInUp");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Head elements */}
      <head>
        <title>SyncGrid - Next-Gen Code Collaboration</title>
        <meta
          name="description"
          content="The modern platform for seamless code collaboration and version control"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </head>

      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GridIcon className="h-8 w-8 text-indigo-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  SyncGrid
                </span>
              </div>
            </div>
            <div>
              <a
                href="/auth"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/20"
              >
                Login / Signup
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-on-scroll"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="block">Code. Sync. </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Build Together
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
            SyncGrid is the next-generation platform for seamless code
            collaboration. Version control, CI/CD, and project management
            reimagined.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/auth"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/30 animate-pulse hover:animate-none"
            >
              Start Syncing Now
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-lg text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              Learn More →
            </a>
          </div>
        </div>

        {/* Code Preview Animation */}
        <div className="mt-16 max-w-4xl mx-auto overflow-hidden rounded-xl bg-gray-800 shadow-2xl border border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 animate-on-scroll">
          <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">syncgrid.config.js</div>
          </div>
          <div className="p-6 font-mono text-sm md:text-base">
            <div className="text-purple-400">const</div>
            <div className="text-gray-400 ml-4">config = {`{`}</div>
            <div className="text-gray-400 ml-8">
              <span className="text-indigo-400">project</span>:{" "}
              <span className="text-green-400">'your-awesome-app'</span>,
            </div>
            <div className="text-gray-400 ml-8">
              <span className="text-indigo-400">autoSync</span>:{" "}
              <span className="text-yellow-400">true</span>,
            </div>
            <div className="text-gray-400 ml-8">
              <span className="text-indigo-400">collaborators</span>: [
              <span className="text-green-400">'team@domain.com'</span>]
            </div>
            <div className="text-gray-400 ml-4">{`}`};</div>
            <br />
            <div className="text-purple-400">export default</div>
            <div className="text-gray-400">config;</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-800/50 rounded-3xl my-12"
      >
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Why SyncGrid?
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            The complete solution for modern development teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 animate-on-scroll delay-${
                index * 100
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Trusted by Developers
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4">
                  <span className="text-lg">{testimonial.emoji}</span>
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center animate-on-scroll">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to revolutionize your workflow?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Join the future of code collaboration with SyncGrid.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/auth"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Create Your Account
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-lg text-lg font-medium border border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-white transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <GridIcon className="h-6 w-6 text-indigo-500" />
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  SyncGrid
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                The next-generation platform for code collaboration.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/docs"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SyncGrid Technologies. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Custom Grid Icon
const GridIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

// Other icons
const ServerIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6" y2="6"></line>
    <line x1="6" y1="18" x2="6" y2="18"></line>
  </svg>
);

const UsersIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ShieldIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ZapIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const CodeIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

// Data
const features = [
  {
    title: "Smart Sync",
    description:
      "Real-time code synchronization across all team members with conflict-free merging.",
    icon: GridIcon,
  },
  {
    title: "Build Pipelines",
    description:
      "Automated build, test, and deployment workflows tailored to your stack.",
    icon: ServerIcon,
  },
  {
    title: "Team Workspaces",
    description:
      "Shared environments with granular permissions and access controls.",
    icon: UsersIcon,
  },
  {
    title: "Enterprise Security",
    description:
      "Military-grade encryption and compliance with industry standards.",
    icon: ShieldIcon,
  },
  {
    title: "Instant Preview",
    description:
      "See changes live before merging with our unique preview system.",
    icon: ZapIcon,
  },
  {
    title: "Project Tracking",
    description:
      "Integrated task management with code-level context and automation.",
    icon: CodeIcon,
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Lead Developer at TechCorp",
    quote:
      "SyncGrid has transformed how our distributed team collaborates. The real-time sync is magical.",
    emoji: "👨‍💻",
  },
  {
    name: "Sarah Kim",
    role: "Engineering Manager",
    quote:
      "Finally a platform that understands modern development workflows. The CI/CD integration is flawless.",
    emoji: "🚀",
  },
  {
    name: "Miguel Rodriguez",
    role: "Open Source Maintainer",
    quote:
      "As an OSS maintainer, SyncGrid's collaboration tools have made my life so much easier.",
    emoji: "💻",
  },
];

export default Landing;
