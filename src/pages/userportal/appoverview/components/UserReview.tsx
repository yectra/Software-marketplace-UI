import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GetApplications } from '@/pages/userportal/appoverview/services';
import { AddReviewForm, OverallRatingResponse } from '@/pages/userportal/appoverview/models';
import useLoading from '@/common/hooks/useLoading';
import LoadingBackdrop from '@/common/UI/LoadingBackdrop';

import { Box, Typography, Grid, TextField, Rating, Button } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

const UserReview: React.FC = () => {
  const location = useLocation();
  const { appId } = location.state;

  const getApplications = new GetApplications();

  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>('');
  const { isLoading, setLoading } = useLoading();
  const [overallRatingData, setOverallRatingData] = useState<OverallRatingResponse | null>(null);

  const submitReview = async () => {
    const formData: AddReviewForm = {
      userEmail: "deepak@yectra.com",
      userName: "Deepak",
      rating: rating ? rating.toString() : "0",
      review
    };
    try {
      setLoading(true);
      const response = await getApplications.addApplicationRating(appId, formData);
      console.log(response);
      setReview("");
      setRating(0);
    } catch (err) {
      console.error(err);
    } finally {
      fetchReviews();
      setLoading(false);
    }
  };

  const addReviewVote = async (reviewId: string, voteType: boolean) => {
    try {
      setLoading(true);
      console.log(voteType)
      console.log(reviewId)
      await getApplications.addVoteForRating(appId, reviewId, voteType);
      fetchReviews(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getApplications.getApplicationOverallRating(appId);
      setOverallRatingData(response);
      console.log(response);
    } catch (error) {
      console.error('Failed to fetch overall rating:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [appId]);

  if (!overallRatingData) {
    return null;
  }

  const { overallRating, ratingCounts, totalRatings, totalReviews, reviews } = overallRatingData;

  return (
    <Box sx={{ p: 1 }}>
      <LoadingBackdrop isLoading={isLoading} />
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Rating & Review</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #AEA8A8", borderRadius: "2px", p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h4" component="span" sx={{ color: "#6D6767" }}>{overallRating.toFixed(1)}</Typography>
              <GradeIcon sx={{ color: "#6D6767" }} />
            </Box>
            <Typography variant="body2">{totalRatings} Ratings & {totalReviews} Reviews</Typography>
            <Box mt={2} width="100%">
              {[5, 4, 3, 2, 1].map((value) => (
                <Box key={value} display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1" sx={{ width: '30px', textAlign: 'center' }}>{value}</Typography>
                  <GradeIcon sx={{ color: "#6D6767" }} />
                  <Box width="100%" ml={1} position="relative">
                    <Box bgcolor="grey.300" height={10} width="100%" sx={{ borderRadius: "6px", position: "absolute" }} />
                    <Box bgcolor="#0C9DBD" height={10} width={`${(ratingCounts[value] / totalRatings) * 100}%`} sx={{ borderRadius: "6px", position: "absolute" }} />
                  </Box>
                  <Typography variant="body2" sx={{ ml: 1 }}>{ratingCounts[value]}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Write a Review</Typography>
            <Rating
              name="new-review-rating"
              value={rating}
              precision={0.5}
              onChange={(_, newValue) => setRating(newValue)}
              sx={{ mb: 2, color: "#0C9DBD" }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ mb: 2, color: "#0C9DBD" }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0C9DBD",
                '&:hover': {
                  bgcolor: "#0C9DBD"
                }
              }}
              onClick={submitReview}
            >
              Submit Review
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {reviews.map((review) => (
            <Box key={review._id} sx={{ p: 2, border: "1px solid #AEA8A8", borderRadius: "2px", mb: 2 }}>
              <Box display="flex" mb={1} justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Box sx={{
                    display: "flex", width: 38, height: 30, bgcolor: "#0C9DBD", alignItems: "center",
                    boxShadow: 1, borderRadius: 1, justifyContent: "space-evenly", color: "white"
                  }}>
                    <Typography>{review.rating}</Typography>
                    <GradeIcon sx={{ fontSize: "1rem" }} />
                  </Box>
                  <Box ml={2}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{review.userName}</Typography>
                    <Typography variant="body2" mb={1}>{review.review}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box display="flex" alignItems="center">
                    <ThumbUp
                      fontSize="small"
                      sx={{ color: "#6D6767", cursor: 'pointer' }}
                      onClick={() => addReviewVote(review._id, true)}
                    />
                    <Typography variant="body2" ml={0.5}>{review.likes}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <ThumbDown
                      fontSize="small"
                      sx={{ color: "#6D6767", cursor: 'pointer' }}
                      onClick={() => addReviewVote(review._id, false)}
                    />
                    <Typography variant="body2" ml={0.5}>{review.dislikes}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserReview;
