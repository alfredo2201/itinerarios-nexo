import { useLocation } from "react-router";

export default function useCompanyId() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('companyId') || '';
}