import { ValidationResponse } from "@/app/components/ui-components/ProjectCreateForm";

export const stringRequired = (i: string, vr: ValidationResponse) => {
  if (!i) {
    vr.hasError = true;
    vr.errorMessage = "Field is required";
  }
  return vr;
};
