/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './products/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
    const { products, productsCount, error, loading } = useSelector(state => state.products)
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(()=>{
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts());

    }, [dispatch, alert, error])
    
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
    </> }
    </>
  )
}

export default Home