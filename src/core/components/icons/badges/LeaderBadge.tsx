export const ActiveLeaderBadge = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="60" height="60" fill="url(#pattern0_190_37731)" />
      <defs>
        <pattern
          id="pattern0_190_37731"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_190_37731" transform="scale(0.00543478)" />
        </pattern>
        <image
          id="image0_190_37731"
          width="184"
          height="184"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const InactiveLeaderBadge = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="60" height="60" fill="url(#pattern0_190_37741)" />
      <defs>
        <pattern
          id="pattern0_190_37741"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_190_37741" transform="scale(0.00543478)" />
        </pattern>
        <image
          id="image0_190_37741"
          width="184"
          height="184"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};