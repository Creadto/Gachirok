import React from 'react';

export const HeroHostIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props} // 다른 SVG props를 전달할 수 있도록
    >
      <defs>
        <linearGradient
          id="xuk7xgzmba"
          x1=".5"
          x2=".5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#ed41e2" />
          <stop offset="1" stopColor="#9204c3" />
        </linearGradient>
      </defs>
      <g data-name="그룹 82693">
        <path
          data-name="패스 43299"
          d="M667.143 398.822a7.271 7.271 0 0 0 6.964.535c2.962 12.61-6.964 15.67-6.964 15.67s-9.926-3.06-6.963-15.67a7.269 7.269 0 0 0 6.963-.535z"
          transform="translate(-658.143 -397.925)"
          style={{ fill: 'url(#xuk7xgzmba)' }}
        />
        <path data-name="사각형 146228" style={{ fill: 'none' }} d="M0 0h18v18H0z" />
        <path
          data-name="패스 43300"
          d="M488.832 424.806a4.246 4.246 0 0 0-4.247 4.246 4.245 4.245 0 0 0-4.245-4.246 4.246 4.246 0 0 0 4.245-4.246 4.247 4.247 0 0 0 4.247 4.246z"
          transform="translate(-475.335 -416.056)"
          style={{ fill: '#fff' }}
        />
      </g>
    </svg>
  );
};
