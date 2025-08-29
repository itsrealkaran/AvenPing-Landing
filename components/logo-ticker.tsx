"use client";

import expLogo from "@/public/images/exp.svg";
import dearMomLogo from "@/public/images/dear_mom.svg";
import zhiLogo from "@/public/images/zhi.svg";
import expGlobalLogo from "@/public/images/exp_global.svg";
import maestroLogo from "@/public/images/maestro.svg";
import dreamLaunchLogo from "@/public/images/dream_launch.svg";
import quantumLogo from "@/public/images/quantum.svg";
import acmeLogo from "@/public/images/acme-corp.svg";
import echoValleyLogo from "@/public/images/echo-valley.svg";
import pulseLogo from "@/public/images/pulse.svg";
import outsideLogo from "@/public/images/outside.svg";
import apexLogo from "@/public/images/apex.svg";
import celestialLogo from "@/public/images/celestial.svg";
import twiceLogo from "@/public/images/twice.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const logos = [
    { name: "DreamLaunch", image: dreamLaunchLogo },
    { name: "Ask Maestro", image: maestroLogo },
    { name: "Exp", image: expLogo },
    { name: "Dear Mom", image: dearMomLogo },
    { name: "Zhi", image: zhiLogo },
    { name: "Exp Global", image: expGlobalLogo },
    // { name: "Acme Corp", image: acmeLogo },
    // { name: "Echo Valley", image: echoValleyLogo },
    // { name: "Pulse", image: pulseLogo },
    // { name: "Outside", image: outsideLogo },
    // { name: "Apex", image: apexLogo },
    // { name: "Celestial", image: celestialLogo },
];

export default function LogoTicker() {
    return (
        <section className="py-24 lg:pt-[32rem]    overflow-x-clip bg-white">
            <div className="container p-[1rem] sm:p-[0rem] max-w-6xl mx-auto">
                <h3 className="text-center text-gray-600 text-xl">
                    Trusted by leading businesses worldwide
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{
                            x: "-50%",
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex gap-24 pr-24"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {logos.map((each) => (
                                    <Image
                                        src={each.image}
                                        alt={each.name}
                                        key={each.name}
                                        className="opacity-60 invert
                                        "
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}