export class UpdateAppdetails {
    email: string;
    gitHubLink: string;
    dockerHubLink: string;
    appName: string;
    appVersion: string;
    versionDescription: string;
  }

  export class getLatestVersion{
    email:string;
    appName:string;
  }



 export class UploadAppDetails {
     appName:string;
     email:string;
    shortDescription: string;
    appDescription: string;
    category: string;
    keywords: string;
    gitHubLink: string;
    dockerHubLink: string;
    appVersion:string;
  }

  export const categories = [
    { value: 'Productivity', label: 'Productivity' },
    { value: 'Games', label: 'Games' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Education', label: 'Education' },
  ];