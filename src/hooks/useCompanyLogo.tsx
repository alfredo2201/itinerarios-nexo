import { useEffect, useState } from "react";
import type { Company } from "../models/Trasportation";
import { getCompanyById } from "../services/CompanyService";

export default function useCompanyLogo(companyId: string):{logo:string} {
  const [logo, setLogo] = useState<string>('');

  useEffect(() => {
    if (!companyId) return;  
    getCompanyById(companyId)
      .then((company: Company) => {
        console.log('Company logo loaded:', company);
        if (company?.image) {
          setLogo(company.image);          
        }
      })
      .catch(err => console.error('Error loading company logo:', err));
  }, [companyId]);

  return {logo};
}