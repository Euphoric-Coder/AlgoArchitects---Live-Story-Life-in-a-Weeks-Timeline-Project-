import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Teams = () => {
  const teamMembers = [
    {
      name: "Sushmita S",
      role: "Strategy and Planning",
      bio: "Founder of Sush boss Website management & data analyst. Responsible for strategic planning and project management. Skilled in project management, data analysis, and website development.",
      image: "/Sushmita.png",
      social: {
        linkedin:
          "https://www.linkedin.com/in/sushmitha-s-999b02317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        github: "https://github.com/Sushmithas747",
        email: "Sushmithas2190@gmail.com",
      },
    },
    {
      name: "Anurag Sharma",
      role: "Design & Frontend Animations",
      bio: "UI/UX designer and Frontend Developer focused on meaningful interactions and seamless digital experiences through intuitive UI and responsive development.",
      image: "/Anurag.png",
      social: {
        linkedin: "https://www.linkedin.com/in/anurag-sharma-42a080307/",
        github: "https://github.com/AnuragSharma-11",
        email: "anuragsharma.bharat11@gmail.com",
      },
    },
    {
      name: "Sagnik Dey",
      role: "Full Stack Developer (MERN & NextJS)",
      bio: "Full-stack engineer specializing in React, Node.js, and NextJS. Experienced in building scalable, high-performance timeline infrastructure.",
      image: "/Sagnik.png",
      social: {
        linkedin: "https://www.linkedin.com/in/sagnik-dey475",
        github: "https://github.com/Euphoric-Coder",
        email: "deydsagnik48@gmail.com",
      },
    },
  ];

  return (
    <section
      id="team"
      className="py-32 px-6 bg-blue-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-700 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            The People Behind{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Your Timeline
            </span>
          </h2>

          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            A passionate team of designers and developers dedicated to helping
            you visualize, plan, and celebrate every meaningful moment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              {/* Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 opacity-10 blur-xl rounded-3xl group-hover:opacity-20 transition-all duration-300 pointer-events-none" />

              {/* Card */}
              <div className="relative bg-white/90 dark:bg-gray-700/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-600 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                {/* Avatar */}
                <div className="relative mb-8 flex justify-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Online Indicator */}
                  <div className="absolute bottom-1 right-[calc(50%-14px)] w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-700 shadow-md" />
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>

                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                    {member.role}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {/* LinkedIn */}
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 hover:scale-110"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
