import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import ProductModalUpdate from '../../components/ProductModal_Update';
import ProductModalDelete from '../../components/ProductModal_Delete';
import ReviewModal from '../../components/ReviewModal';
import "./ProductProfile.css";
import "../../components/ReviewModal/ReviewModal.css"
import ReviewFormCreate from '../../components/ReviewModal_Create/ReviewForm_Create';
import SignupFormModal from '../SignupFormModalCopy'
import ProductCard from '../ProductProfilePage/productCard'

function ProductProfilePgModal2({product, setShowModal, showModal}) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const users = useSelector(state => state.users);
    const newest2 = document.getElementsByClassName("productContainer")[0];

    const productTopics = useSelector(state => state.products);
    const productTopicsArr = Object.values(productTopics)
    const productUserId = product?.userId
    const productTopicId = product?.topicId
    const productId = product?.id
    const productTopicsArrFiltered = productTopicsArr.filter (product => product?.topicId === productTopicId && productId !== product?.id)
    newest2?.classList?.add("hide");

    useEffect(() => {
        (async () => {
            setIsLoaded(true);
        })();
    }, [dispatch, sessionUser])

    let newArr = [product.thumbnailUrl, product.galleryImage1, product.galleryImage2, product.galleryImage3]
    if (newArr.includes(null)) {
        newArr = newArr.filter(image => image !== null && image !== '' && image.length > 1);
    }
    const topics = [['Freelance'], ["Open Source"], ['User Experience'], ['Design Tools'],
    ['Developer Tools'], ['Home'], ['Productivity'], ['Education'], ['Health & Fitness'], ['Music']]

    let event = new Date(product?.createdAt);
    let date = event.toLocaleDateString().slice(0,5) + event.toLocaleDateString().slice(7,9)

    const handleCancel = (e) => {
        e.preventDefault();
        setShowModal(false);
        newest2.classList.remove("hide");
      }

    const similarProdCards = productTopicsArrFiltered.map(product => {
        return (
        <ProductCard product={product} ashowModal={showModal}/>
        )
      }
    )

    if (!isLoaded) {
        return (
            <div id="loadingGif">
                <img src={"https://cdn.dribbble.com/users/77121/screenshots/11223084/media/49067e332b338ecd2e9f42afd6b605a3.gif"} height="615px" width="850px" alt="loading"/>
                <div className="loadText">Loading</div>
            </div>
            );
        }

    return (
        isLoaded && (<>
            <div key={product?.id}  className="modal-child">
                <div className="productContainer2">
                    <div className="headerSection">
                        <div className="mainInfo">
                            {<img className="profileImg" src={product?.thumbnailUrl} height="25%" width="50%" alt="display"/>}
                            <div className="titleTagline">
                            <div className="CreateUpdateDeleteBtns">
                                <div id="prodProfileTitle2">
                                    {product?.name}
                                        {sessionUser?.id === product?.userId &&
                                        <><ProductModalUpdate product={product} setShowModal={setShowModal} ashowModal={showModal}/>
                                        <ProductModalDelete product={product} setShowModal={setShowModal}/></>}
                                    </div>
                                </div>
                                <p id="productDescription2">{product?.tagline}</p>
                                <div className="buttons">
                                    <div className="priceOption">Free & Paid Options</div>
                                    <div className="toolType">{topics[product?.topicId -1]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="leftSide">
                        <div className="mainImage">
                            <div className="gallery">
                                    <div className="mainInfo2">
                                        {newArr.map(image => {
                                            if (image?.length > 1) return <img className="img5" src={image} alt="display" height="584.97px" min-width="658px"/>
                                        })}
                                    </div>
                                {product?.galleryImage1?.length > 1 && (<>
                                <img className="carouselPics" src={product?.galleryImage1} alt="display"/>
                                </>)}
                                {product?.galleryImage2?.length > 1 && (<>
                                <img className="carouselPics" src={product?.galleryImage2} alt="display"/>
                                </>)}
                                {product?.galleryImage3?.length > 1 && (<>
                                <img className="carouselPics" src={product?.galleryImage3} alt="display"/>
                                </>)}
                            </div>
                            <div className='description'>
                                {product?.description}
                                <div className="dateProd">FEATURED {date}</div>
                            </div>
                        </div>
                        <div className="discuss">DISCUSSION</div>
                        <div className="description2">
                        <div className="reviewInput">
                            Would you recommend this product?
                            {sessionUser && (
                            <ReviewFormCreate productId={product?.id} review={product?.Review}/>
                            )}
                            {!sessionUser && (
                            <ReviewFormCreate productId={product?.id} product={product} review={product?.Review} setShowModal={setShowModal}/>
                            )}
                        </div>
                        <div className="review">
                            {isLoaded && <ReviewModal product={product}/>}
                        </div>
                        </div>
                    </div>

                    <div className="rightSide">
                        <div className="upvoteSection">
                            {sessionUser && (<>
                            <a href={product?.link} target="_blank" rel="noopener noreferrer" className='getItBtn'>GET IT</a>
                            <button onClick={''} className="upvoteBtn">{('hi') ? `▲ UPVOTED  ` : `▲ UPVOTE   ` }
                                <div>
                                    {'hi'}
                                </div>
                            </button>
                            </>)}
                            {!sessionUser && (<>
                            <a href={product?.link} target="_blank" rel="noopener noreferrer" className='getItBtn'>GET IT</a>
                            <div>
                                <SignupFormModal setShowModal={setShowModal} product={product}/>
                            </div>
                            </>)}
                            {/* <div className='productUpvoters'>
                            {'hi' && Object.values('hi').map((user,idx) => {
                            return (idx < 3) ? (<img key={user.id} className='upvoterPic' src={''} />) : null;
                            })}
                            </div> */}
                        </div>
                        <div className="relatedProdHeader2">UPVOTERS</div>
                        <div className="upvoterUsers">
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                            <div className="profPicStuff"></div>
                        </div>
                        <div className="areaBelow">
                            <div className="hunterLink">
                                <div className="hunterHeader">HUNTER</div>
                                <div className="userCard">
                                    <div className="userProfilePic"></div>
                                    <div className="userCardRight">
                                        <div className="userName">{users[productUserId]?.username}</div>
                                        <div className="userProduct">{product?.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hunterLink">
                                <div className="makerHeader">MAKER</div>
                                <div className="userCard">
                                    <div className="userProfilePic"></div>
                                    <div className="userCardRight">
                                        <div className="userName">{users[productUserId]?.username}</div>
                                        <div className="userProduct">{product?.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relatedProdHeader">RELATED PRODUCTS</div>
                        <div className="similarProdCardsSec">
                            {similarProdCards}
                        </div>
                    </div>
                </div>
            </div>
            <button className="circleClose" onClick={handleCancel}>x</button>
        </>)
   );
}

export default ProductProfilePgModal2;
