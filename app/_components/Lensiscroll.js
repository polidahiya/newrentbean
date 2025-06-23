"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisWrapper() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
// import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
//  const device = await DeviceDetector();
//  {device == "desktop" && <LenisWrapper />}