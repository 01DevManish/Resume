"use client";
import useResumeStore from "@/store/resumeStore";

const Header = () => {
  const profile = useResumeStore((state) => state.profile);
  return (
    <header className="text-center mb-4">
      <h1 className="text-3xl font-bold uppercase mb-1">{profile?.name}</h1>
      <h2 className="text-xl uppercase mb-2">{profile?.role}</h2>
      <hr className="border-t border-gray-300 my-2" />
      <div className="mt-4 flex justify-center space-x-4">
        <a
          href={`tel:${profile?.phone}`}
          className="text-blue-600 hover:underline"
        >
          {profile?.phone}
        </a>
        <a
          href={`mailto:${profile?.email}`}
          className="text-blue-600 hover:underline"
        >
          {profile?.email}
        </a>
        <a
          href={profile?.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Website
        </a>
        <a
          href={profile?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={profile?.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;
