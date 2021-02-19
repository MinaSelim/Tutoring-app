export default interface IReview {
    reviewId: string,
    studentId: string,
    tutorId: string,
    reviewText: string,
    communicationRating: number,
    knowledgeRating: number,
    wouldTakeAgainRating: number,
    timestamp: string
}