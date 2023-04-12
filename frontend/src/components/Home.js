/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination  from 'react-js-pagination'
import { useParams } from 'react-router-dom'

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const Range  = Slider;

const Home = () => {
    const { products, productsCount, error, loading, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState("");
    const categories = [
        'Electronics',
        'Books',
        'Food',
        'Foot wear',
        'Clothes',
        'Headphones',
        'Accessories',
        'Cameras',
        'Laptops'
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();
    // const match = useParams()

   const { keyword } = useParams();
//    const keyword = match.keyword
//    console.log(keyword)

    useEffect(()=>{
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, category));

    }, [dispatch, alert, error, keyword, currentPage, price, category])

    const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber)

    let count = productsCount
    if(keyword){
        count = filteredProductsCount
    }
    
    
  return (
    <>
    { loading ? <Loader/> :
    <>
    <MetaData title={'Buy Best Products Online'}/>
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
        <div className="row">
            {keyword ? (
                <>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                        <label htmlFor="priceRange">Price Range:</label>
                        <Range
                            min={0}
                            max={1000}
                            defaultValue={[0, 1000]}
                            value={price}
                            onChange={price=> setPrice(price)}
                            tipFormatter={value => `Ksh${value}`}
                            range
                            marks={{ 0: 'Ksh0', 1000: 'Ksh1000' }}
                            // step={1}
                            tipProps={{
                                visible: true,
                                // overlayClassName: 'rc-tooltip-custom',
                                placement: 'top',
                            }}
                        />
                        <hr className='my-5'/>
                        <div className="mt-5">
                            <h4 className='mb-3'> Categories </h4>
                            <ul className="pl-0">
                                {categories.map(category=>(
                                    <li style={{
                                        cursor: 'pointer',
                                        listStyleType: 'none'
                                            }}
                                            key={category}
                                            onClick={()=> setCategory(category)}>
                                                {category}
                                            </li>
                                ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-9">
                        <div className="row">
                            { 
                                products && products.map(product=>
                                    <Product key={product._id} product={product} col = {4}/>)
                            }
                        </div>
                    </div>
                </>
            ): 
            (
                products && products.map(product=>
                    <Product key={product._id} product={product} col= {3}/>
            )
            )}
        </div>
        </section>
        {resPerPage <= count &&(
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
