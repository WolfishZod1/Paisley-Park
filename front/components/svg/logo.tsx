interface Props {
  className: string;
}

function Logo(props: Props) {
  const { className } = props;

  return (
    <svg
      className={className}
      viewBox="0 0 462 469"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.23584"
        y="4.14612"
        width="453.461"
        height="460.039"
        fill="#369A45"
      />
      <line
        x1="334.704"
        y1="130.506"
        x2="322.941"
        y2="130.506"
        stroke="white"
      />
      <path
        d="M457.697 464.185V4.14612L295.136 464.185H457.697Z"
        fill="#04654E"
      />
      <path
        d="M4.23441 4.14668L457.696 4.1467L4.23441 170.694L4.23441 4.14668Z"
        fill="#901E3B"
      />
      <path
        d="M296.204 463.643H3.7002L129.365 339.41H231.5H334.706V131.633L457.696 4.146L296.204 463.643Z"
        fill="#11D088"
      />
      <path
        d="M457.697 4.14612L4.23584 170.693V464.185L129.605 339.953V234.437V131.091H334.462L457.697 4.14612Z"
        fill="#F51C44"
      />
      <rect
        x="35.5376"
        y="35.5074"
        width="391.118"
        height="397.643"
        fill="white"
      />
      <ellipse
        cx="230.965"
        cy="234.165"
        rx="6.4164"
        ry="6.50948"
        fill="#FF0000"
      />
      <path
        d="M351.675 119.182L339.615 108.212L261.709 191.918L265.259 210.783L351.675 119.182Z"
        fill="#7D1A33"
      />
      <path
        d="M187.613 269.231L104.331 359.868L115.766 371.749L178.814 300.981L187.613 269.231Z"
        fill="#10C37F"
      />
      <path
        d="M178.813 300.981L265.264 211.008L261.709 191.918L187.613 269.231L178.813 300.981Z"
        fill="#045B46"
      />
      <path
        d="M109.922 341.539L133.132 363.482L132.401 403.105L78.96 399.331L74.7002 344.267L109.922 341.539Z"
        fill="#10C37F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M399.675 58.73L286.585 103.327L322.37 136.11L359.761 169.351L399.675 58.73Z"
        fill="#E91B41"
      />
      <ellipse
        cx="231.096"
        cy="237.485"
        rx="18.9251"
        ry="18.9354"
        fill="#045B46"
      />
      <g filter="url(#filter0_f_20_80)">
        <rect
          x="4.0502"
          y="4.04995"
          width="453.795"
          height="460.106"
          stroke="black"
          strokeWidth="0.7"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_20_80"
          x="0.000195265"
          y="-4.88758e-05"
          width="461.895"
          height="468.206"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.85"
            result="effect1_foregroundBlur_20_80"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Logo;
