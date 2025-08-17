import { use, useState } from "react";
import { FaLaptopCode, FaUsers, FaLightbulb } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export const Career = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isDark} = use(AuthContext)
  const [selectedPosition, setSelectedPosition] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    github: "",
    reason: "",
  });

  const handleOpenModal = (position) => {
    setSelectedPosition(position);
    setFormData({ ...formData, position });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Your application has been submited")
    setFormData("")
    setIsModalOpen(false);
    // Here you can integrate your backend API to submit the application
  };

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 text-gray-800">
      {/* 1. Hero Section */}
      <section className="text-center mt-10 py-20">
        <h1 className={`text-5xl font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>Careers at Ziffy</h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-600">
          Join our mission to build the most engaging, inclusive, and
          knowledge-driven forum for communities around the world.
        </p>
      </section>

      {/* 2. Why Work at Ziffy */}
      <section className="py-16 max-w-6xl mx-auto border-t border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
          Why Work at Ziffy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-6  rounded-xl shadow-sm text-center ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <FaLightbulb className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className={`mt-4 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
              Innovative Culture
            </h3>
            <p className="text-gray-600 mt-2">
              Work on challenging projects that push creativity and technology
              forward.
            </p>
          </div>
          <div className={`p-6  rounded-xl shadow-sm text-center ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <FaUsers className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className={`mt-4 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
              Collaborative Team
            </h3>
            <p className="text-gray-600 mt-2">
              Join a supportive team of passionate individuals who value
              learning and growth.
            </p>
          </div>
          <div className={`p-6  rounded-xl shadow-sm text-center ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <FaLaptopCode className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className={`mt-4 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Career Growth</h3>
            <p className="text-gray-600 mt-2">
              We encourage professional development and provide opportunities to
              enhance your skills.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Current Openings */}
      <section className="py-16 max-w-6xl mx-auto border-t border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
          Current Openings
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Full-Stack Developer */}
          <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition ${isDark  ? "bg-gray-800": "bg-white"}`}>
            <h3 className="text-2xl font-semibold mb-2 text-rose-600">
              Full-Stack Developer
            </h3>
            <p className={` mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              We are looking for a passionate Full-Stack Developer to join our
              team. You will help build and scale Ziffy’s platform, working on
              both frontend and backend projects.
            </p>
            <p className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-800"} mb-2`}>
              Responsibilities:
            </p>
            <ul className={`list-disc list-inside mb-4 ${isDark ? "text-gray-300": "text-gray-600"}`}>
              <li>
                Design, develop, and maintain web applications using MERN stack.
              </li>
              <li>
                Collaborate with the design and product teams for smooth UI/UX.
              </li>
              <li>Write clean, maintainable, and scalable code.</li>
              <li>
                Ensure application performance, security, and responsiveness.
              </li>
            </ul>
            <p className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Requirements:</p>
            <ul className={`list-disc list-inside ${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
              <li>
                Strong knowledge of JavaScript, React, Node.js, Express.js, and
                MongoDB.
              </li>
              <li>Experience with RESTful APIs and modern web tools.</li>
              <li>Ability to work in a collaborative team environment.</li>
              <li>Problem-solving mindset and attention to detail.</li>
            </ul>
            <button
              onClick={() => handleOpenModal("Full-Stack Developer")}
              className="inline-block mt-4 px-6 py-2 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
            >
              Apply Now
            </button>
          </div>

          {/* Community Manager */}
          <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition ${isDark  ? "bg-gray-800": "bg-white"}`}>
            <h3 className="text-2xl font-semibold mb-2 text-rose-600">
              Community Manager
            </h3>
            <p className={` mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Seeking an organized and passionate Community Manager to oversee
              Ziffy's forum activities, ensuring engagement and inclusivity.
            </p>
            <p className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-800"} mb-2`}>
              Responsibilities:
            </p>
            <ul className={`list-disc list-inside mb-4 ${isDark ? "text-gray-300": "text-gray-600"}`}>
              <li>Moderate forums and manage community interactions.</li>
              <li>Organize virtual events and discussions.</li>
              <li>Develop strategies to grow and engage members.</li>
              <li>Report on community trends and feedback.</li>
            </ul>
            <p className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Requirements:</p>
            <ul className={`list-disc list-inside ${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
              <li>
                Proven experience in community management or similar roles.
              </li>
              <li>Excellent communication and interpersonal skills.</li>
              <li>Familiarity with online forums and social platforms.</li>
              <li>
                Ability to handle conflicts and maintain a positive environment.
              </li>
              <li>Strong organizational and planning skills.</li>
            </ul>
            <button
              onClick={() => handleOpenModal("Community Manager")}
              className="inline-block mt-4 px-6 py-2 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-16 px-6 text-center border-t border-gray-200">
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}>Ready to Shape the Future?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          If you’re passionate about communities and technology, Ziffy is the
          place to grow, contribute, and make a real impact.
        </p>
        <button
          onClick={() => handleOpenModal("")}
          className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
        >
          Apply Now
        </button>
      </section>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className={` rounded-xl shadow-lg w-full max-w-lg p-8 relative ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Apply for a Position
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`flex gap-4 ${isDark ? "text-white" : "text-black"}`}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              >
                <option value="">Select Position</option>
                <option value="Full-Stack Developer">
                  Full-Stack Developer
                </option>
                <option value="Community Manager">Community Manager</option>
              </select>

              <input
                type="text"
                name="github"
                placeholder="GitHub Link"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />

              <textarea
                name="reason"
                placeholder="Why should we hire you?"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                rows={5}
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
