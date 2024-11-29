import express from "express";
import ProductController from "../controllers/productController";
import ReviewController from "../controllers/reviewController";
import UserController from "../controllers/userController";
import CartController from "../controllers/cartController";
import OrderController from "../controllers/orderController";


const router = express.Router()

// PRODUCTS
router.get('/products/filter', ProductController.getAllProductsOrFilteredProducts)
router.get('/product/:productId', ProductController.getOneProduct)
router.get('/products-search', ProductController.getSearchedProducts)

// REVIEWS
router.post('/create-review', ReviewController.createReview)
router.post('/get-reviews', ReviewController.getReviews)

// USERS
router.post('/signup', UserController.signUp)
router.post('/signup/verify-code', UserController.signUpVerifyCode)
router.post('/signin', UserController.signIn)
router.post('/discount-status', UserController.changeDiscountStatus)
router.post('/get-profile', UserController.getProfileInfo)
router.post('/set-address', UserController.setAddress)

// CART
router.post('/add-to-cart', CartController.addToCart)
router.post('/get-cart', CartController.getCart)
router.post('/remove-from-cart', CartController.removeFromCart)

// ORDER
router.post('/create-order', OrderController.createOrder)
router.post('/get-order', OrderController.getOrder)
router.post('/remove-from-order', OrderController.removeFromOrder)
router.post('/create-payment', OrderController.createPayment)

// PAID ORDER
router.post('/create-paid-order', OrderController.createPaidOrder)
router.post('/get-paid-order', OrderController.getPaidOrder)


export default router;