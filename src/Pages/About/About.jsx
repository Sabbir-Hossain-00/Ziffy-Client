import { use, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

export const About = () => {
  const { isDark , user } = use(AuthContext);

  const teamMeet = [
    {
      name: "Sabbir Hossain",
      role: "Founder & Lead Organizer",
      image: "https://i.ibb.co/jvLdLRC7/sabbir-logo.webp",
    },
    {
      name: "Sakil Atik",
      role: "Volunteer Coordinator",
      image: "https://i.ibb.co/5W9MTw1L/sakil.jpg",
    },
    {
      name: "Juweel Mafi",
      role: "Community Manager",
      image: "https://i.ibb.co/8gQDLDCr/juwel.jpg",
    },
    {
      name: "Hossain Mashood",
      role: "Tech & Operations",
      image: "https://i.ibb.co/23ptBx1t/mashood.jpg",
    },
  ];

  useEffect(() => {
    document.title = "About - Ziffy";
    return () => {
      document.title = "Ziffy"; // reset on unmount
    };
  }, []);

  return (
    <section className="mt-10 py-10 pb-20 container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 min-h-screen space-y-20">
      {/* Hero Split Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-center py-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">We're More Than a Forum</h1>
          <p className="text-gray-500 leading-relaxed">
            Ziffy is built on one belief: meaningful conversations can change
            the world. Whether it’s sharing knowledge, discussing ideas, or
            connecting with like-minded people — we bring communities together
            in one place.
            <br />
            <br />
            Our mission goes beyond being just another discussion board. We
            create a space that inspires curiosity, encourages collaboration,
            and builds a culture of learning. Every post, every comment, and
            every interaction at Ziffy is powered by respect, inclusivity, and
            the drive to grow together.
            <br />
            <br />
            Through Ziffy, we aim to spark conversations that matter, ideas that
            inspire, and connections that last. Because a smarter, kinder, and
            more connected world starts with people who dare to share.
            <br />
            <br />
            Join us in shaping a platform where your voice is valued, your ideas
            are heard, and your community is waiting to grow with you.
          </p>
        </div>
        <img
          src="https://i.ibb.co/hRNSrW5C/freepik-the-style-is-candid-image-photography-with-natural-78950.jpg"
          alt="About us"
          className="rounded-xl w-full h-100 object-cover shadow-md"
        />
      </div>

      {/* What We Do Section */}
      <div className="py-10">
        <h2 className="text-3xl font-bold text-center mb-10">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Facilitate Knowledge Sharing",
              desc: "We provide a platform where members can share insights, tutorials, and resources across diverse topics.",
            },
            {
              title: "Connect Like-Minded People",
              desc: "Ziffy brings together individuals who are passionate about learning, discussing, and collaborating.",
            },
            {
              title: "Encourage Meaningful Discussions",
              desc: "Our forum promotes respectful, thoughtful conversations that spark ideas and inspire growth.",
            },
            {
              title: "Highlight Top Contributors",
              desc: "We recognize and reward active members who contribute valuable content and engage positively with the community.",
            },
            {
              title: "Organize Virtual Events & Challenges",
              desc: "From coding challenges to community debates, Ziffy hosts activities that engage members and foster creativity.",
            },
            {
              title: "Foster Safe & Inclusive Environment",
              desc: "We maintain moderated spaces where everyone can participate without fear of harassment or negativity.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl shadow-md border transition-all duration-300 hover:scale-105  text-black ${isDark ? "bg-gray-900  text-white border-blue-950 ": "bg-white border-rose-100"}`}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the Team */}
      <div className="px-4 py-10">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMeet?.map((team, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl shadow-xl flex flex-col items-center text-center transition hover:shadow-xl ${
                isDark ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-4">
                <img
                  className="w-20 h-20 rounded-full"
                  src={team.image}
                  alt=""
                />
              </div>
              <h3 className="font-bold">{team.name}</h3>
              <p className="text-sm text-gray-500">{team.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 text-center border-y border-dashed border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Ready to share your ideas, ask questions, or connect with like-minded
          people? Ziffy is the place to grow, learn, and collaborate.
        </p>
        {
            user ? (<Link
          to="/"
          className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
        >
          View Forum
        </Link>) : (<Link
          to="/register"
          className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
        >
          Get Started
        </Link>)
        }
      </div>
    </section>
  );
};
