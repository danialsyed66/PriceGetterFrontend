import React from "react";

export default function dashboard({ colorOne, colorTwo }) {
  return (
    <div>
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
        <path
          d="M22.2396 18H18.8021C18.3598 18 18 18.3598 18 18.8021V20.8646C18 21.3069 18.3598 21.6667 18.8021 21.6667H22.2396C22.6819 21.6667 23.0417 21.3069 23.0417 20.8646V18.8021C23.0417 18.3598 22.6819 18 22.2396 18Z"
          fill={colorTwo}
        />
        <path
          d="M22.2396 22.5833H18.8021C18.3598 22.5833 18 22.943 18 23.3854V28.1979C18 28.6402 18.3598 28.9999 18.8021 28.9999H22.2396C22.6819 28.9999 23.0417 28.6402 23.0417 28.1979V23.3854C23.0417 22.943 22.6819 22.5833 22.2396 22.5833Z"
          fill={colorTwo}
        />
        <path
          d="M28.1976 25.3333H24.7601C24.3178 25.3333 23.958 25.693 23.958 26.1354V28.1979C23.958 28.6402 24.3178 28.9999 24.7601 28.9999H28.1976C28.6399 28.9999 28.9997 28.6402 28.9997 28.1979V26.1354C28.9997 25.693 28.6399 25.3333 28.1976 25.3333Z"
          fill={colorTwo}
        />
        <path
          d="M28.1976 18H24.7601C24.3178 18 23.958 18.3598 23.958 18.8021V23.6146C23.958 24.0569 24.3178 24.4167 24.7601 24.4167H28.1976C28.6399 24.4167 28.9997 24.0569 28.9997 23.6146V18.8021C28.9997 18.3598 28.6399 18 28.1976 18V18Z"
          fill={colorTwo}
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
    </div>
  );
}
