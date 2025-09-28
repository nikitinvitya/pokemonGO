import React, { useEffect, useState, useRef } from 'react';
import cls from './GaugeArc.module.scss';

interface GaugeArcProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
}

export const GaugeArc: React.FC<GaugeArcProps> = ({
  value,
  max,
  size = 200,
  strokeWidth = 20,
  duration = 1000,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const targetProgress = Math.min(value / max, 1) * circumference;

  const [progress, setProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(svgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setProgress(targetProgress);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [targetProgress, visible]);

  const arcYCoordinate = radius;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size / 1.5}
      viewBox={`0 0 ${size} ${size / 2}`}
    >
      <defs>
        <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="red" />
          <stop offset="50%" stopColor="yellow" />
          <stop offset="100%" stopColor="green" />
        </linearGradient>
      </defs>

      <path
        d={`
          M ${strokeWidth / 2} ${arcYCoordinate}
          A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${arcYCoordinate}
        `}
        stroke="#eee"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
      />

      <path
        d={`
          M ${strokeWidth / 2} ${arcYCoordinate}
          A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${arcYCoordinate}
        `}
        className={cls.arc}
        stroke="url(#gauge-gradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        fill="transparent"
        style={{ transition: `stroke-dashoffset ${duration}ms ease` }}
      />

      <text
        x="50%"
        y="85%"
        textAnchor="middle"
        fontSize={size * 0.15}
        fontWeight="bold"
        fill="var(--secondary-color)"
      >
        {value}
      </text>
    </svg>
  );
};
