interface PaginationInfoProps {
  fromIndex: number;
  toIndex: number;
  total: number;
}

export default function PaginationInfo({ fromIndex, toIndex, total }: PaginationInfoProps) {
  return (
    <div className="text-[13px] 2xl:text-[15px] text-slate-500">
      <span>Mostrando </span>
      <b>{fromIndex + 1}-{toIndex}</b>
      {" "}de {total}
    </div>
  );
}