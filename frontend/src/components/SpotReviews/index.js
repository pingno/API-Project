
import { useSelector, useDispatch } from 'react-redux'
import { getReviewsforSpot } from '../../store/reviews'
import { useEffect } from 'react'

export default function Reviews ({theSpot}){

    const dispatch = useDispatch()
    const spotReviewsObj = useSelector(state => state.reviews)
    console.log(" SPOT REVIEWS OBJ ", spotReviewsObj)


    const spotReviewsArr = Object.values(spotReviewsObj)

    console.log(" SPOT REVIEWS ARR ", spotReviewsArr)

    useEffect(() => {
        dispatch(getReviewsforSpot(theSpot.id))
    },[dispatch])

    if(!spotReviewsArr) return null
    


    return (
        <>
        <div>
        <i class="fa-solid fa-star"></i>
        <div>{theSpot.avgRating}</div>
        {/* <div>{numReviews}</div> */}
        </div>
        
        </>
    )


}