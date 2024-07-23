
export class Appparams{
    email:string;
    appName:string
}


 export class RatingItem{
    label: string;
    value: string;
  };


export class VersionFeedbackReportProps {
  versionData: {
    Params: RatingItem[];
    adminComments: string;
    codeDescription: string;
    maintainability: string;
    optimization: string;
    readability: string;
  };
}