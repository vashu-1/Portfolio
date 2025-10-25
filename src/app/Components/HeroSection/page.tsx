'use client';

import React, { FC, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import bg_image from '@/public/images/bgImage.png';
import infinity from '@/public/images/infinity.png';
import avatar from '@/public/images/avatarPortfolio.png';
import astrocat from '@/public/images/astrocat-c96b6ce0d913.png';
import loader from '@/loader.gif';

import { skills } from './skillsData';

import { HoverEffect } from '../UI/CardHoverEffect';
import { FloatingDock } from '../UI/Floating-dock';
import { FlipWords } from '../UI/flip-words';
import EncryptButton from '../UI/Encrypt-Button';
import { cn } from '@/utils/cn';
import OverlayCard from '../UI/overlay-video';

import { SiLeetcode } from 'react-icons/si';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { IoCallOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { CgCodeSlash } from 'react-icons/cg';
import { BiBitcoin } from 'react-icons/bi';
import { LuBrainCircuit } from 'react-icons/lu';

import { motion, Variants } from 'framer-motion';

interface FadeInOptions {
  direction: 'up' | 'down' | 'left' | 'right';
  delay: number;
}

const fadeIn = ({ direction, delay }: FadeInOptions) => {
  return {
    hidden: {
      y: direction === 'up' ? 70 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

interface MousePosition {
  x: number;
  y: number;
}

type CursorVariant = 'default' | 'text';

const HeroSection: FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    // const mouseMove = (e: MouseEvent) => {
    //   setMousePosition({
    //     x: e.clientX,
    //     y: e.clientY,
    //   });
    // };

    // window.addEventListener("mousemove", mouseMove);

    // return () => {
    //   window.removeEventListener("mousemove", mouseMove);
    // };

    const cursor = document.querySelector<HTMLElement>('.cursor');

    if (cursor) {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    }
  }, []);

  // Define the type for variants using the Variants type from framer-motion
  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: '#06f9ff',
      mixBlendMode: 'difference',
    },
  };

  const textEnter = () => setCursorVariant('text');
  const textLeave = () => setCursorVariant('default');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => {
      setLoading(false); // Once the page is loaded, hide the loader
    };
    handleLoading();
  }, []);

  return (
    <>
      <motion.div
        className="cursor hidden md:flex"
        variants={variants}
        animate={cursorVariant}
      />

      {loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <Image src={loader} alt="" className="h-40 w-40" />
        </div>
      ) : (
        <div>
          {/* HERO */}

          <div className="h-[100vh] w-full relative flex items-center flex-col no-scrollbar">
            <Image
              src={bg_image}
              alt=""
              className="absolute -z-10 h-full w-full"
            />

            <div className="">
              {/* Radial gradient for the container to give a faded look */}
              <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>

              <div className="flex justify-between items-center w-full left-0 z-40 absolute mt-8 px-4 md:px-[16vw]">
                <h1
                  className="navHead text-2xl text-sky-200 opacity-80"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Vijay Modak
                </h1>

                <EncryptButton
                  buttonText="Resume"
                  driveLink={
                    'https://drive.google.com/file/d/1Fj_E3QtxYwwRaIdIq9iBHBNq9YoC7s5d/view?usp=drive_link'
                  }
                />
              </div>

              <div className="flex justify-between gap-48 text-white">
                <motion.div
                  variants={fadeIn({ direction: 'right', delay: 0.4 })}
                  initial="hidden"
                  whileInView={'show'}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex flex-col mx-6 py-8 mt-[24vh] z-20"
                >
                  <h4 className="mb-6 md:mb-12 tracking-widest">
                    Hi, I&apos;m
                  </h4>

                  <p
                    className="heroHead text-4xl md:text-7xl font-bold relative tracking-widest"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    Vijay Modak
                  </p>

                  <div className="mt-10 text-2xl md:text-3xl font-extrabold">
                    <FlipWords words={['Web Developer', 'CAD Designer']} />
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeIn({ direction: 'left', delay: 0.4 })}
                  initial="hidden"
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                  className="hidden md:flex"
                >
                  <Image
                    src={astrocat}
                    alt=""
                    className="home-img h-80 w-80 mt-52"
                  />
                </motion.div>
              </div>

              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.4 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: true, amount: 0.1 }}
                className="flex items-center mt-28 md:mt-20 lg:mt-[4vh] flex-wrap gap-2 mx-4"
              >
                <Link href={'https://github.com/vashu-1'}>
                  <div className="flex justify-center items-center h-[55px] w-[55px] bg-gradient-to-tr from-transparent via-transparent to-gray-500 border border-gray-500 rounded-xl text-gray-400 relative cursor-pointer hover:shadow-sm hover:border-sky-600 hover:to-sky-800  hover:text-white hover:shadow-sky-400 transition ease-in-out delay-100 ">
                    <FaGithub className="h-6 w-6 " />
                  </div>
                </Link>
                <div className="flex justify-center items-center w-[5vw] mx-5 relative">
                  <p className="h-[.3px] w-full bg-slate-600  absolute"></p>
                  <p className="h-1 w-1 bg-slate-500 rounded-full"></p>
                </div>
                <Link
                  href={
                    'https://www.linkedin.com/in/vijay-kumar-modak-3497632a8/'
                  }
                >
                  <div className="flex justify-center items-center h-[55px] w-[55px] bg-gradient-to-tr from-transparent via-transparent to-gray-500 border border-gray-500 rounded-xl text-gray-400 relative cursor-pointer hover:shadow-sm hover:border-sky-600 hover:to-sky-800  hover:text-white hover:shadow-sky-400 transition ease-in-out delay-100 ">
                    <FaLinkedin className="h-6 w-6 " />
                  </div>
                </Link>
                <div className="flex justify-center items-center w-[5vw] mx-5 relative">
                  <p className="h-[.3px] w-full bg-slate-600  absolute"></p>
                  <p className="h-1 w-1 bg-slate-500 rounded-full"></p>
                </div>
                <Link href={'https://www.instagram.com/vashu_2854/'}>
                  <div className="flex justify-center items-center h-[55px] w-[55px] bg-gradient-to-tr from-transparent via-transparent to-gray-500 border border-gray-500 rounded-xl text-gray-400 relative cursor-pointer hover:shadow-sm hover:border-sky-600 hover:to-sky-800  hover:text-white hover:shadow-sky-400 transition ease-in-out delay-100 ">
                    <FaInstagram className="h-6 w-6 " />
                  </div>
                </Link>
                <div className="flex justify-center items-center w-[5vw] mx-5 relative">
                  <p className="h-[.3px] w-full bg-slate-600  absolute"></p>
                  <p className="h-1 w-1 bg-slate-500 rounded-full"></p>
                </div>
                <Link href={''}>
                  <div className="flex justify-center items-center h-[55px] w-[55px] bg-gradient-to-tr from-transparent via-transparent to-gray-500 border border-gray-500 rounded-xl text-gray-400 relative cursor-pointer hover:shadow-sm hover:border-sky-600 hover:to-sky-800  hover:text-white hover:shadow-sky-400 transition ease-in-out delay-100 ">
                    <SiLeetcode className="h-6 w-6 " />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* ABOUT */}

          <motion.section
            variants={fadeIn({ direction: 'up', delay: 0.4 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="h-fit md:h-[100vh] w-full px-8 py-10 md:py-0 lg:pl-40 lg:pr-24 text-white"
          >
            <h1 className="flex flex-col justify-center items-center mt-16 md:mt-32">
              <p
                className="heading font-outline-2 text-transparent text-5xl md:text-7xl -mb-7"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                ABOUT ME
              </p>

              <p
                className="text-4xl md:text-6xl font-extrabold"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                ABOUT ME
              </p>
            </h1>

            <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-8 md:gap-16">
              <div className="flex justify-between items-left flex-col">
                <h1
                  className="text-lg md:text-xl"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  Merging creativity with code to build a better, decentralized
                  world tomorrow.
                </h1>
                <p className="h-[2px] w-[60%] md:w-[20vw] bg-sky-500 mt-2"></p>
                <div className="mt-8">
                  I am Vijay Kumar Modak, a passionate individual on a journey
                  to make a better world with technology and creativity,
                  currently pursuing my B.Tech in Production and Industrial
                  Engineering at Birsa Institute of Technology Sindri, Dhanbad.
                  I am a dedicated Web developer, CAD designer and an emerging
                  Blockchain developer.
                </div>
              </div>

              <Image src={avatar} alt="" className="md:w-[50%]" />
            </div>
          </motion.section>

          {/* WHAT I DO? */}

          <section className="">
            <h1 className=" flex flex-col justify-center items-center mt-32 text-white">
              <p
                className="heading font-outline-2 text-transparent text-5xl md:text-7xl -mb-7"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                WHAT I DO?
              </p>

              <p
                className="text-4xl md:text-6xl font-extrabold"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                WHAT I DO?
              </p>
            </h1>
            <p className="hidden md:flex mt-20 w-[80%] pl-60">
              From understanding your requirements, designing a blueprint and
              delivering the final product, I do everything that falls in
              between these lines.
            </p>
            <p className="hidden md:flex h-[1px] w-[16vw] bg-sky-500 mt-2 ml-60"></p>
            <div className="flex flex-wrap justify-center items-center gap-10 mt-10 md:mt-20">
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
                className="max-w-xs w-full"
              >
                <div
                  className={cn(
                    'group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent border-neutral-800 hover:border-sky-900 ',

                    // Preload hover image by setting it in a pseudo-element
                    'before:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]',
                    'hover:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]',
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    'transition-all duration-500'
                  )}
                >
                  <div className="w-full flex justify-center absolute mb-16 -ml-4 ">
                    <CgCodeSlash className="w-full h-full font-extrabold text-gray-500 opacity-40" />
                  </div>
                  <div className="text relative z-50">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                      Web <br /> Development
                    </h1>
                    <p className="font-normal text-base relative my-4 text-gray-300">
                      If you&apos;re looking for a web developer to bring your
                      vision to life, I&apos;m here to handle everything from
                      concept to launch with precision and creativity.
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* <motion.div
                variants={fadeIn({ direction: "up", delay: 0.2 })}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.1 }}
                className="max-w-xs w-full"
              >
                <div
                  className={cn(
                    "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent border-neutral-800 hover:border-sky-900",

                    // Preload hover image by setting it in a pseudo-element
                    "before:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                    "hover:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]",
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    "transition-all duration-500"
                  )}
                >
                  <div className="w-full flex justify-center absolute mb-16 -ml-4">
                    <BiBitcoin className="w-full h-full font-extrabold text-gray-500 opacity-35" />
                  </div>
                  <div className="text relative z-50">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                      Blockchain Development
                    </h1>
                    <p className="font-normal text-base text-gray-300 relative my-4">
                      If you&apos;re in need of a Blockchain developer to turn
                      your ideas into secure and scalable solutions, I&apos;m
                      here to guide the process from concept to implementation.
                    </p>
                  </div>
                </div>
              </motion.div> */}
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
                className="max-w-xs w-full"
              >
                <div
                  className={cn(
                    'group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent border-neutral-800 hover:border-sky-900',

                    // Preload hover image by setting it in a pseudo-element
                    'before:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]',
                    'hover:bg-[url(https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]',
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    'transition-all duration-500'
                  )}
                >
                  <div className="w-full flex justify-center absolute mb-20 -ml-4">
                    <LuBrainCircuit className="w-[85%] h-[85%] font-extrabold text-gray-500 opacity-35" />
                  </div>
                  <div className="text relative z-50">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                      CAD Designer
                    </h1>
                    <p className="font-normal text-base text-gray-300 relative my-4">
                      A detail-oriented designer passionate about turning
                      concepts into precise and functional designs, I&apos; am
                      here to use my technical expertise and creativity to bring
                      your ideas to reality with accuracy and innovation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SKILLS */}

          <motion.div
            variants={fadeIn({ direction: 'up', delay: 0.4 })}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="flex justify-center items-center flex-col mt-28"
          >
            <h1 className="flex flex-col justify-center items-center  mt-10 ">
              <p
                className="heading font-outline-2 text-transparent text-5xl md:text-7xl -mb-7"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                SKILLS
              </p>

              <p
                className="text-4xl md:text-6xl font-extrabold text-white"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                SKILLS
              </p>
            </h1>
            <div className="max-w-5xl mx-auto px-4 md:px-8 text-gray-400">
              <HoverEffect items={skills}></HoverEffect>
            </div>
          </motion.div>

          {/* PROJECTS */}

          <div className="py-28 md:py-20">
            <h1 className="flex flex-col justify-center items-center mt-16">
              <p
                className="heading font-outline-2 text-transparent text-5xl md:text-7xl -mb-7"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                PORTFOLIO
              </p>

              <p
                className="text-4xl md:text-6xl font-extrabold text-white"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                PROJECTS
              </p>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10 mt-20 px-6 lg:px-40">
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://shopkart-2025-frontend.onrender.com/'}>
                  <OverlayCard
                    image="https://d33609liqwio9r.cloudfront.net/2025-10-22T13:08:35.157Z-ecomm2.jpg"
                    video="../../../video/ecommerce2 (1).mp4"
                    heading="ShopKart"
                    description="An MERN based e-commerce platform for online shopping"
                    githubUrl="https://github.com/vashu-1/ShopKart-2025"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://mern-chat-frontend-4r6p.onrender.com/'}>
                  <OverlayCard
                    image="https://d33609liqwio9r.cloudfront.net/2025-10-20T19:22:13.471Z-representation-user-experience-interface-design.jpg"
                    video="../../../video/chatapp (1).mp4"
                    heading="MERN Chat App"
                    description="A real-time chat application using MERN stack"
                    githubUrl="https://github.com/vashu-1/MERN-Chat"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link
                  href={'https://food-delivery-frontend-aze9.onrender.com/'}
                >
                  <OverlayCard
                    image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    video="../../../video/Food-Flick - Google Chrome 2025-10-21 01-05-16 (1).mp4"
                    heading="Food Delivery"
                    description="An online food delivery application with admin panel"
                    githubUrl="https://github.com/vashu-1/Food-Delivery"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://brainwave-olive-alpha.vercel.app/'}>
                  <OverlayCard
                    image="https://d33609liqwio9r.cloudfront.net/2025-10-20T19:50:26.610Z-technology-integrated-everyday-life.jpg"
                    video="../../../video/Brainwave - Google Chrome 2025-10-20 18-30-09 (1).mp4"
                    heading="Brainwave"
                    description="An AI-powered website for chat app"
                    githubUrl="https://github.com/vashu-1/Brainwave"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://gym-sigma-mauve.vercel.app/'}>
                  <OverlayCard
                    image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    video="../../../video/Gymate - Google Chrome 2025-10-20 18-28-26 (1).mp4"
                    heading="Gymate"
                    description="A React based fitness website to track workouts and nutrition"
                    githubUrl="https://github.com/vashu-1/Gym"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://md-computers-8vgu.vercel.app/'}>
                  <OverlayCard
                    image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    video="../../../video/mdcomputers (1).mp4"
                    heading="MD Computers"
                    description="An e-commerce website for computer parts and accessories"
                    githubUrl="https://github.com/vashu-1/md-computers"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://rest-sample1.vercel.app/'}>
                  <OverlayCard
                    image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    video="../../../video/Chili & Chaat Restaurant - Modern React.js Frontend Restaurant Website - Google Chrome 2025-10-20 18-29-26 (1).mp4"
                    heading="Chili & Chaat"
                    description="A React based landing restaurant website for online food ordering"
                    githubUrl="https://github.com/vashu-1/rest-sample1"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://vashu-1.github.io/IIC_6.0/'}>
                  <OverlayCard
                    image="https://d33609liqwio9r.cloudfront.net/2025-10-22T19:28:36.893Z-051510382ef119751713d8b58c992856.jpg"
                    video="/video/iic 6.0.mp4"
                    heading="IIC 6.0"
                    description="A Frontend project contains the web design of club in BIT sindri"
                    githubUrl="https://github.com/vashu-1/IIC_6.0"
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn({ direction: 'up', delay: 0.2 })}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
              >
                <Link href={'https://rest-sample2.vercel.app/'}>
                  <OverlayCard
                    image="https://d33609liqwio9r.cloudfront.net/2025-10-20T19:52:26.255Z-restaurant-interior.jpg"
                    video="../../../video/Tomato - Google Chrome 2025-10-20 18-23-48 (1).mp4"
                    heading="Tomato"
                    description="A Frontend project for a restaurant website"
                    githubUrl="https://github.com/vashu-1/rest-sample2"
                  />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="h-[70vh] md:h-[50vh] flex justify-center items-center flex-col mt-28 bg-gradient-to-t from-transparent to-gray-900">
            <h1
              className="text-5xl md:text-6xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-[#1c9dd8] flex justify-center items-start md:items-center gap-2 md:gap-5 flex-col md:flex-row mb-16"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {' '}
              <span>Let&apos;s </span>
              <span className="flex justify-center items-center">
                W
                <Image
                  src={infinity}
                  alt=""
                  className="h-12 w-12 md:h-20 md:w-20"
                />
                rk
              </span>
              <span> Together</span>
            </h1>

            <div className="flex items-center gap-8">
              <h2 className="text-lg md:text-2xl font-bold text-gray-400 border-b-2 border-sky-500">
                Get In Touch.
              </h2>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <p className="h-[2px] w-[70%] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></p>
          </div>

          {/* FOOTER */}

          <div className="footer h-[70vh] lg:h-[40vh] w-full text-sky-100 relative z-10 flex justify-center items-center flex-col lg:flex-row">
            <div className="h-[30vh] w-[34vw] flex flex-col justify-center items-center lg:border-r-2 border-slate-700 mt-11">
              <h4 className="text-[10px] opacity-70 mb-4 tracking-[6px] w-[100vw] text-center">
                Designed & Developed by
              </h4>
              <h1
                className="opacity-70 text-3xl tracking-[12px] mb-16"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                VIJAY<span className="text-sm">MODAK</span>
              </h1>
              <div className="w-[100vw] hidden md:flex justify-center mb-4 md:w-full">
                <FloatingDock items={links} />
              </div>
            </div>

            <div className="w-full lg:w-[30vw] flex flex-col justify-center items-left pl-7 md:ml-28">
              <div className="Contact tracking-[2px] mb-6 mt-4">
                <h1 className="text-xl mb-4 opacity-80">Contact:</h1>

                <p className=" flex gap-2 mb-2 opacity-65">
                  <IoCallOutline />
                  <span className="text-[11px] ">+91 9142099540</span>
                </p>
                <p className=" flex gap-2 mb-2 opacity-65">
                  <MdEmail />
                  <span className="text-[11px]">vijaymodak9945@gmail.com</span>
                </p>
              </div>
              <div className="copyright text-xs tracking-wider mt-10 opacity-50">
                Copyright &copy; 2025 Vijay Kumar Modak | All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

const links = [
  {
    title: 'Github',
    icon: (
      <FaGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://github.com/vashu-1',
  },

  {
    title: 'LinkedIn',
    icon: (
      <FaLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://www.linkedin.com/in/vijay-kumar-modak-3497632a8/',
  },
  {
    title: 'Instagram',
    icon: (
      <FaInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://www.instagram.com/vashu_2854/',
  },

  {
    title: 'Twitter',
    icon: (
      <BsTwitterX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: '#',
  },
];
