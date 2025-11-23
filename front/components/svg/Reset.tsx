const Reset = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12 7 7m5 5 5 5m-5-5 5-5m-5 5-5 5"
      />
    </svg>
  );
};

export default Reset;
