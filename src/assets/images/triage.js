import React from "react";

export default function triage({ colorOne, colorTwo }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle cx="24" cy="24" r="19" fill={colorOne} />
      </g>
      <rect
        x="19.7856"
        y="19.7852"
        width="8.14283"
        height="8.14283"
        rx="1.5"
        fill={colorTwo}
        stroke={colorTwo}
      />
      <rect
        x="21.9999"
        y="17.4286"
        width="3.71428"
        height="0.857141"
        rx="0.42857"
        fill={colorTwo}
        stroke={colorTwo}
        stroke-width="0.857141"
      />
      <rect
        x="21.9999"
        y="29.4286"
        width="3.71428"
        height="0.857141"
        rx="0.42857"
        fill={colorTwo}
        stroke={colorTwo}
        stroke-width="0.857141"
      />
      <rect
        x="30.5714"
        y="22.286"
        width="3.71428"
        height="0.857141"
        rx="0.42857"
        transform="rotate(90 30.5714 22.286)"
        fill={colorTwo}
        stroke={colorTwo}
        stroke-width="0.857141"
      />
      <rect
        x="18.2858"
        y="22.286"
        width="3.71428"
        height="0.857141"
        rx="0.42857"
        transform="rotate(90 18.2858 22.286)"
        fill={colorTwo}
        stroke={colorTwo}
        stroke-width="0.857141"
      />
      <line
        x1="21.5"
        y1="26.7852"
        x2="22.7857"
        y2="26.7852"
        stroke={colorTwo}
        stroke-linecap="round"
      />
      <line
        x1="24.3569"
        y1="26.7852"
        x2="24.4998"
        y2="26.7852"
        stroke={colorTwo}
        stroke-linecap="round"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
