"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedStats() {
  const [activeEngineers, setActiveEngineers] = useState(0);
  const [aiReviews, setAiReviews] = useState(0);
  const [avgLatency, setAvgLatency] = useState(10.0);
  const [systemUptime, setSystemUptime] = useState(70.0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1500; // 1.5 seconds
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Easing out quadratic curve
      const easeProgress = progress * (2 - progress);

      // Interpolate values
      const currentEngineers = Math.round(easeProgress * 10482);
      const currentReviews = Math.round(easeProgress * 52192);
      
      // Latency decreases from 10.0s to 4.2s
      const currentLatency = (10.0 - easeProgress * (10.0 - 4.2)).toFixed(1);
      
      // Uptime increases from 70.0% to 99.8%
      const currentUptime = (70.0 + easeProgress * (99.8 - 70.0)).toFixed(1);

      setActiveEngineers(currentEngineers);
      setAiReviews(currentReviews);
      setAvgLatency(parseFloat(currentLatency));
      setSystemUptime(parseFloat(currentUptime));

      if (frame === totalFrames) {
        clearInterval(timer);
        // Ensure exact target numbers on completion
        setActiveEngineers(10482);
        setAiReviews(52192);
        setAvgLatency(4.2);
        setSystemUptime(99.8);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div ref={sectionRef} className="stats-dashboard">
      <div className="stat-metric-card">
        <div className="stat-metric-val">
          {activeEngineers.toLocaleString()}
        </div>
        <div className="stat-metric-label">Active Engineers</div>
      </div>
      <div className="stat-metric-card">
        <div className="stat-metric-val">
          {aiReviews.toLocaleString()}
        </div>
        <div className="stat-metric-label">AI Code Reviews</div>
      </div>
      <div className="stat-metric-card">
        <div className="stat-metric-val">
          {avgLatency}s
        </div>
        <div className="stat-metric-label">Avg Review Latency</div>
      </div>
      <div className="stat-metric-card">
        <div className="stat-metric-val">
          {systemUptime}%
        </div>
        <div className="stat-metric-label">System Uptime</div>
      </div>
    </div>
  );
}
