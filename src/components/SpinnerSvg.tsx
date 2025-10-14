export default function SpinnerSvg({ size = 24, stroke = 4, className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      viewBox="0 0 50 50"
      role="status"
      aria-label="Cargando"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray="90"
        strokeDashoffset="0"
        className="text-gray-300"
      />
      <path
        d="M25 5a20 20 0 0 1 0 40"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        className="text-[#023672]"
      />
    </svg>
  );
}