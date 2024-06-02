import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landingpage/page_landing';
import Login from './pages/login/page_login';
import EstablishmentList from './pages/establishment_list/page_establishment_list';
import HomePage from './pages/homepage/page_homepage';
import FoodByEstablishment from './pages/establishment_list/page_establishment_food';
import FoodReview from './pages/reviews/page_food_review';
import EstablishmentReview from './pages/reviews/page_establishment_reviews';

function Router() {

  return(
    <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/view-all-establishments" element={<EstablishmentList />}></Route>
        <Route path="/homepage" element={<HomePage/>}></Route>
        <Route path="/food-by-establishment/:establishment_id" element={<FoodByEstablishment/>}></Route>
        <Route path="/food-review/:food_id" element={<FoodReview />}></Route>
        <Route path="/establishment-review/:establishment_id" element={<EstablishmentReview />}></Route>
    </Routes>
  )
}

export default Router;