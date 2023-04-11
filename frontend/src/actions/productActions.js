import axios from 'axios'

import { ALL_PRODUCTS_SUCCESS, 
         ALL_PRODUCTS_REQUEST, 
         ALL_PRODUCTS_FAIL, 
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL,
         CLEAR_ERRORS} from "../constants/productConstants";

export const getProducts =(currentPage = 1)=> async(dispatch)=> {
    try {
        
        dispatch({ type: ALL_PRODUCTS_REQUEST});

        const { data } = await axios.get(`/api/v1/products?page=${currentPage}`);
        // const { data } = await axios.get(`${process.env.REACT_APP_API}/products`)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getProductDetails =(id)=> async(dispatch)=> {
    try {
        
        dispatch({ type: PRODUCT_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/v1/product/${id}`);
        // const { data } = await axios.get(`${process.env.REACT_APP_API}/product`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}