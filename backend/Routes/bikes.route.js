import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { addBikes , deleteBike ,getBike , getAllBike , RentBike, rentalHistory, ActiveRental, ReturnBike  ,getRentalDetails} from '../controllers/bikes.controller.js'
import upload from '../middleware/multer.middleware.js'
import AdminRoute from '../middleware/admin.middleware.js'


const router = express.Router()


router.post("/addbike" , protectedRoute, AdminRoute  , upload.array("images" , 4) ,  addBikes)
router.post('/deletebike/:bike_id' , protectedRoute , AdminRoute , deleteBike )
router.get('/getbike/:id'  , getBike)
router.get('/getallbikes' , getAllBike)
router.post("/rental/:id", protectedRoute, RentBike);   // <-- POST to rent a bike
router.get("/rental/:bikeId", protectedRoute, getRentalDetails);
router.put("/return/:bikeId" , protectedRoute , ReturnBike)
router.get("/rental-history" , protectedRoute , rentalHistory)
router.get("/active-rentals" , protectedRoute , ActiveRental )



export default router