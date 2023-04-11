/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'

const Home = () => {
    const { products, productsCount, error, loading } = useSelector(state => state.products)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProducts());
    }, [dispatch])
    
  return (
    <>
    { loading ? <h1 className='text text-danger'>Loading....</h1> :
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
    </> }
    </>
  )
}

export default Home