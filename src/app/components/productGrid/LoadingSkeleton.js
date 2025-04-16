"use client";
import { Skeleton, Grid, Box } from "@mui/material";

const LoadingSkeleton = () => (
    <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
            {[...Array(8)].map((_, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: { xs: 180, sm: 240, md: 300 },
                            borderRadius: 2
                        }}
                    />
                    <Box sx={{ pt: 1 }}>
                        <Skeleton width="60%" height={24} />
                        <Skeleton width="40%" height={20} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default LoadingSkeleton;