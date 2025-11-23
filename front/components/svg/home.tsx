interface Props {
  className: string;
}

function HomeSvg(props: Props) {
  const { className } = props;

  return (
    <svg
      className={className}
      viewBox="0 0 42 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 36.6667V20H26.25V36.6667M5.25 15L21 3.33334L36.75 15V33.3333C36.75 34.2174 36.3813 35.0652 35.7249 35.6904C35.0685 36.3155 34.1783 36.6667 33.25 36.6667H8.75C7.82174 36.6667 6.9315 36.3155 6.27513 35.6904C5.61875 35.0652 5.25 34.2174 5.25 33.3333V15Z"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HomeSvg;
