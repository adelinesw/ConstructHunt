import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import ProductProfilePgModal2 from '../../components/ProductProfilePage/SimilarProductProfile'
import "./ProductProfile.css";
import "../../components/ReviewModal/ReviewModal.css"
import { Modal } from '../../context/Modal';

function ProductCard({product, ashowModal}) {
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const newest = document.getElementsByTagName("body")[0];
    const newest2 = document.getElementsByClassName("productContainer")[0];

    const openMenu = (e) => {
        e.preventDefault()
        newest.classList.add("no-scroll");
        newest2?.classList?.add("hide");
        setShowModal(true);
    };

    const closeMenu = (e) => {
        e.preventDefault()
        newest2.classList.remove("hide");
        setShowModal(false);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        newest2.classList.remove("hide");
        setShowModal(false);
    }

    return (<>
    <div>
       <div className="similarProductCard" onClick={openMenu}>
             <img className="similarProductImgs" src={product?.thumbnailUrl}/>
             <div className="rightSideCard">
                 <div className="prodNameSim">{product?.name}</div>
                 <div className="prodTaglineSim">{product?.tagline}</div>
             </div>
        </div>
        </div>
        {showModal && (
        <Modal onClose={closeMenu}>
          <ProductProfilePgModal2 showModal={ashowModal} product={product} setShowModal={setShowModal}
          topicId={product?.topicId}
          />
          <button className="circleClose" onClick={handleCancel}>x</button>
        </Modal>
      )}
    </>)
}
export default ProductCard;