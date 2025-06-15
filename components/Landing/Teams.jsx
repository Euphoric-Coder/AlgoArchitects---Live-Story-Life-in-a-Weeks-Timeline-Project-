import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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
        twitter: "#",
        github: "https://github.com/Sushmithas747",
        email: "Sushmithas2190@gmail.com",
      },
    },
    {
      name: "Anurag Sharma",
      role: "Responsible for Design & Frontend Animations",
      bio: "UI/UX designer and Frontend Developer with a focus on meaningful interactions. Skilled in crafting seamless digital experiences through intuitive UI/UX design, responsive front-end development,",
      image: "/Anurag.png",
      social: {
        linkedin: "https://www.linkedin.com/in/anurag-sharma-42a080307/",
        twitter: "#",
        github: "https://github.com/AnuragSharma-11",
        email: "anuragsharma.bharat11@gmail.com",
      },
    },
    {
      name: "Sagnik Dey",
      role: "Full Stack Developer (MERN & NextJS)",
      bio: "Full-stack engineer specializing in React and Node.js and NextJS. Previously at Rouge Internationals, building scalable timeline infrastructure.",
      image: "/Sagnik.png",
      social: {
        linkedin: "https://www.linkedin.com/in/sagnik-dey475",
        twitter: "#",
        github: "https://github.com/Euphoric-Coder",
        email: "deydsagnik48@gmail.com",
      },
    },
  ];

  return (
    <section
      id="team"
      className="py-32 px-8 bg-gradient-to-b from-white via-slate-50/15 to-blue-50/10 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
              Meet Our Team
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-tight text-slate-800 dark:text-white">
            The People Behind
            <span className="block mt-2 font-light bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 bg-clip-text text-transparent">
              Your Timeline
            </span>
          </h2>

          <p className="text-xl max-w-4xl mx-auto leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
            A passionate team of designers, developers, and storytellers
            dedicated to helping you capture and celebrate every meaningful
            moment of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/95 dark:hover:bg-white/10 border border-slate-100/40 dark:border-white/10 hover:border-slate-200/50 dark:hover:border-white/20 transform hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/80 dark:border-slate-700/50 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed font-light text-slate-600 dark:text-slate-300 tracking-wide">
                  {member.bio}
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  className="p-2 rounded-lg bg-slate-50/80 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.social.github}
                  target="_blank"
                  className="p-2 rounded-lg bg-slate-50/80 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 hover:scale-110"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="p-2 rounded-lg bg-slate-50/80 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 hover:scale-110"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
