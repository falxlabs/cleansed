interface OnboardingFormData {
  temptationType: string;
  temptationLevel: number[];
  affirmation: string;
  checkInTime: string;
  firstName: string;
  age: string;
  email: string;
}

export const validateStep = (step: number, formData: OnboardingFormData): boolean => {
  switch (step) {
    case 1:
      return formData.temptationType.length > 0;
    case 2:
      return formData.temptationLevel.length > 0 && formData.temptationLevel[0] >= 0 && formData.temptationLevel[0] <= 100;
    case 3:
      return formData.affirmation.length > 0;
    case 4:
      return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.checkInTime);
    case 5:
      return formData.firstName.length >= 2;
    case 6:
      return formData.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    default:
      return true;
  }
};