'use client';

import { useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

//const buttonText = "Encrypt data";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = '!@#$%^&*():{};|,.<>/?';

const EncryptButton = ({
  buttonText,
  driveLink,
}: {
  buttonText: string;
  driveLink?: string;
}) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(buttonText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = buttonText
        .split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= buttonText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(buttonText);
  };

  // Function to open drive link in a new tab
  const openDriveLink = () => {
    if (driveLink) {
      window.open(driveLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="inline-flex items-center">
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onClick={openDriveLink}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="group relative overflow-hidden rounded-3xl border-[1px] border-sky-500 bg-transparent px-3 py-1 md:px-4 md:py-2 font-mono font-medium uppercase text-sky-700 transition-colors hover:text-sky-300 hover:border-sky-600 cursor-pointer"
      >
        <div className="relative z-10 flex items-center gap-2">
          <FiLock />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: '100%',
          }}
          animate={{
            y: '-100%',
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 1,
            ease: 'linear',
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-sky-400/0 from-40% via-sky-400/100 to-sky-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
      {driveLink && (
        <a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Drive link"
          className="ml-2 inline-flex items-center rounded px-2 py-1 text-xs font-sans text-sky-600 hover:text-sky-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2 1 21h22L12 2zm0 3.3 6.9 11.7H5.1L12 5.3zM7.6 19 12 8.7 16.4 19H7.6z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default EncryptButton;
