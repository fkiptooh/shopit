/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination  from 'react-js-pagination'

const Home = () => {
    const { products, productsCount, error, loading, resPerPage } = useSelector(state => state.products)
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(()=>{
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts(currentPage));

    }, [dispatch, alert, error, currentPage])

    const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber)
    
  return (
    <>
    { loading ? <Loader/> :
    <>
    <MetaData title={'Buy Best Products Online'}/>
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
        <div className="row">
        {products && products.map(product=>
                <Product key={product._id} product={product}/>
            )
            }
        </div>
        </section>
        {resPerPage <= productsCount &&(
            <div className='d-flex justify-content-center mt-5'>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}    
                nextPageText={'Next'}
                prevPageText={'Previous'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass='page-item'
                linkClass='page-link'
            />
        </div>
        )}
    </> }
    </>
  )
}

export default Home