import { FaLaptopCode, FaUsers, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router";

export const Career = () => {
  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 text-gray-800">
      {/* 1. Hero Section */}
      <section className="text-center mt-10 py-20">
        <h1 className="text-5xl font-bold text-gray-900">Careers at Ziffy</h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-600">
          Join our mission to build the most engaging, inclusive, and
          knowledge-driven forum for communities around the world.
        </p>
      </section>

      {/* 2. Why Work at Ziffy */}
      <section className="py-16  max-w-6xl mx-auto border-t border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
          Why Work at Ziffy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white  rounded-xl shadow-sm  text-center">
            <FaLightbulb className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className="mt-4 font-semibold text-gray-800">
              Innovative Culture
            </h3>
            <p className="text-gray-600 mt-2">
              Work on challenging projects that push creativity and technology
              forward.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm bg-white text-center">
            <FaUsers className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className="mt-4 font-semibold text-gray-800">
              Collaborative Team
            </h3>
            <p className="text-gray-600 mt-2">
              Join a supportive team of passionate individuals who value
              learning and growth.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm bg-white text-center">
            <FaLaptopCode className="mx-auto text-rose-500 w-10 h-10" />
            <h3 className="mt-4 font-semibold text-gray-800">Career Growth</h3>
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
          <div className="p-6 rounded-xl shadow-md  hover:shadow-lg transition bg-white">
            <h3 className="text-2xl font-semibold mb-2 text-rose-600">
              Full-Stack Developer
            </h3>
            <p className="text-gray-600 mb-4">
              We are looking for a passionate Full-Stack Developer to join our
              team. You will help build and scale Ziffy’s platform, working on
              both frontend and backend projects.
            </p>
            {/* Responsibilities */}
            <p className="font-semibold text-gray-800 mb-2">
              Responsibilities:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
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
            <p className="font-semibold text-gray-800">Requirements:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>
                Strong knowledge of JavaScript, React, Node.js, Express.js, and
                MongoDB.
              </li>
              <li>Experience with RESTful APIs and modern web tools.</li>
              <li>Ability to work in a collaborative team environment.</li>
              <li>Problem-solving mindset and attention to detail.</li>
            </ul>
            <Link
              to="/apply"
              className="inline-block mt-4 px-6 py-2 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
            >
              Apply Now
            </Link>
          </div>

          {/* Another Vacancy (Example: Community Manager) */}
          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white">
            <h3 className="text-2xl font-semibold mb-2 text-rose-600">
              Community Manager
            </h3>
            <p className="text-gray-600 mb-4">
              Seeking an organized and passionate Community Manager to oversee
              Ziffy's forum activities, ensuring engagement and inclusivity.
            </p>

            {/* Responsibilities */}
            <p className="font-semibold text-gray-800 mb-2">
              Responsibilities:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Moderate forums and manage community interactions.</li>
              <li>Organize virtual events and discussions.</li>
              <li>Develop strategies to grow and engage members.</li>
              <li>Report on community trends and feedback.</li>
            </ul>

            {/* Requirements */}
            <p className="font-semibold text-gray-800 mb-2">Requirements:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
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

            <Link
              to="/apply"
              className="inline-block mt-4 px-6 py-2 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-16 px-6 text-center border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-4">Ready to Shape the Future?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          If you’re passionate about communities and technology, Ziffy is the
          place to grow, contribute, and make a real impact.
        </p>
        <Link
          to="/apply"
          className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow hover:bg-rose-600 transition"
        >
          Apply Now
        </Link>
      </section>
    </div>
  );
};
