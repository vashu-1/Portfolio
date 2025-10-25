"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

const OverlayCard = ({
  image,
  video,
  heading,
  description,
  githubUrl,
}: {
  image: string;
  video: string;
  heading: string;
  description: string;
  githubUrl?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isVideoLoading, setIsVideoLoading] = useState<Boolean>(true);

  const handleVideoLoaded = () => {
    setIsVideoLoading(false); // Set loading to false when the video is loaded
  };

  return (
    <div
      className={cn(
        "max-w-sm w-full relative rounded-lg flex-1 transition-transform duration-300 ease-in-out cursor-pointer",
        isHovered
          ? "z-10 md:scale-y-110 md:scale-x-150 border border-sky-900"
          : "z-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video (Hover Background) */}
      {isHovered ? (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-all"
            onLoadedData={handleVideoLoaded}
            src={video}
            autoPlay
            muted
            loop
          />
          {!isVideoLoading ? (
            ""
          ) : (
            <div className="text-sky-300 bg-black w-full absolute h-[50vh] flex justify-center items-center rounded-lg transition-all">
              Loading Preview, Please wait...
              <br /> OR <br /> Click to visit website
            </div>
          )}
        </>
      ) : (
        <div className="absolute w-full h-full rounded-lg transition-all">
          <div className="absolute w-full h-full bg-black opacity-40 z-10"></div>
          <img
            className="absolute inset-0 w-full h-full object-cover "
            src={image}
            alt="Card background"
          />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 w-full h-96 rounded-lg shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "transition-all duration-500"
        )}
      >
        {!isHovered && (
          <div className="relative z-50 text">
            <h1 className="relative font-bold text-xl md:text-3xl text-sky-50">
              {heading}
            </h1>
            <p className="relative my-4 font-normal text-base text-sky-200">
              {description}
            </p>
          </div>
        )}
        
        {/* GitHub Button - Shows on hover */}
        {isHovered && githubUrl && (
          <div className="relative z-50 flex justify-end items-end h-full">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-sky-500/50 hover:border-sky-400"
              title="View on GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverlayCard;
