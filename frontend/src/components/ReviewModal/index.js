import {useSelector, useDispatch} from 'react-redux';
import {getReviews} from '../../store/review';
import {getAllUsers} from '../../store/user'
import {useEffect, useState} from 'react';
import ReviewTest from './review'

function ReviewModal({product}) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        e.preventDefault();
        setShowMenu(true);
      };

    useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
        setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    }, [showMenu]);

    useEffect(() => {
        (async () => {
            await dispatch(getReviews(product?.id));
            await dispatch(getAllUsers());
            setIsLoaded(true)
        })();
    }, [dispatch, product?.id])

    const reviews = useSelector(state => Object.values(state?.reviews))
    const reviewsFilter = reviews?.filter(review => review.productId === product.id)
    const users = useSelector(state => Object.values(state?.users))
    let reviewUser = {...users}

    return (isLoaded && (
        <>
            {
            reviewsFilter.map(review => {
            let event = new Date(review?.createdAt);
            let date = event.toLocaleDateString().slice(0,5) + event.toLocaleDateString().slice(7,9)

            return (
            <div className="review" key={review?.id}>
                <div className="review1">
                    <div className="flexThis">
                        <div className="circle"></div>
                        <div className="styleThis">
                            <div className="reviewUser">{reviewUser[review?.userId-1].username}</div>
                            <ReviewTest review={review} date={date}/>
                        </div>
                    </div>
                </div>
            </div>
            )
        })}
        </>
      )
    )
}

export default ReviewModal;
