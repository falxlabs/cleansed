interface OnboardingData {
  temptationType: string;
  temptationLevel: number[];
  affirmation: string;
  checkInTime: string;
  firstName?: string;
  age?: string;
}

export const saveOnboardingData = (data: OnboardingData): void => {
  localStorage.setItem("defaultTemptation", data.temptationType);
  localStorage.setItem("defaultTemptationLevel", data.temptationLevel[0].toString());
  localStorage.setItem("affirmationType", "custom");
  localStorage.setItem("customAffirmation", data.affirmation);
  localStorage.setItem("checkInTime", data.checkInTime);
  
  if (data.firstName) {
    localStorage.setItem("firstName", data.firstName);
  }
  if (data.age) {
    localStorage.setItem("age", data.age);
  }
};