
  
  export class AppDetails{
    appName:string;
    shortDescription:string;
    overallRating:number;
    staticWebAppURL:string;
    appLogo:string;

  }

  export class AppOverview{
    shortDescription:string;
    appName:string;
    appDescription:string;
    appDescriptionImage:string;
    appType:string;
    appVersion:string;
    appImage:string;
    app_id:string;
    category:string;
    version_id:string;
    updatedOn:string
  }

  export class AddReviewForm{
    userEmail:string;
    userName:string;
    rating:string;
    review:string;
  }


  
  class Review {
    app_id: string;
    createdAt: string;
    dislike: number;
    like: number;
    rating: string;
    review: string;
    review_id: string;
    userName: string;
  }
  
export class AppFeedback {
    ratings: {
      [key: number]: number;
      averageRating: number;
      totalRatings: number;
    };
    totalReviewers: number;
    totalReviews: number;
    reviews: Review[];
  }
