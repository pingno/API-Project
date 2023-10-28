import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import { useSelector, useDispatch } from "react-redux"

export default function ReviewTile({review}){

    const user = useSelector((state) => state.session.user);
    let month = review.createdAt.split("-")[1];
    let year = review.createdAt.split("-")[0];

    return(

        <div className="review-tile" key={review.id}>
          <div className="review-first-name">
            {review.User?.firstName}
          </div>
          <div className="review-date">
            {month} {year}
          </div>
          <div className="review-description">{review.review}</div>

          {review.userId === user?.id &&
        ( <OpenModalButton 
        buttonText={"Delete"}
        modalComponent={<DeleteReviewModal reviewId={review.id}/>}
        />
         )}
        </div>

    );
}