"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

const OverlayCard = ({
  image,
  video,
  heading,
  description,
}: {
  image: string;
  video: string;
  heading: string;
  description: string;
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
      </div>
    </div>
  );
};

export default OverlayCard;
