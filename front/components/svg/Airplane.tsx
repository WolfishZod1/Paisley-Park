const Airplane = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => {
  return (
    <svg
      onClick={onClick}
      style={{
        transform: "translateX(3px) translateY(1px)",
      }}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m6 12-3 9 18-9L3 3l3 9zm0 0h6"
      />
    </svg>
  );
};

export default Airplane;
