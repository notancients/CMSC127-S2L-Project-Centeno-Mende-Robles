import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landingpage/page_landing';
import Login from './pages/login/page_login';
import EstablishmentList from './pages/establishment_list/page_establishment_list';
import HomePage from './pages/homepage/page_homepage';
import FoodByEstablishment from './pages/establishment_list/page_establishment_food';
import FoodReview from './pages/reviews/page_food_review';
import EstablishmentReview from './pages/reviews/page_establishment_reviews';
import CreateEstablishment from './pages/establishment_list/page_create_establishment';
import SearchEstablishment from './pages/establishment_list/page_search_establishment';
import CreateEstablishmentReview from './pages/reviews/create_establishment_review';
import UpdateEstablishment from './pages/establishment_list/page_update_establishment';
import UpdateFood from './pages/food/page_update_food';

function Router() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/view-all-establishments" element={<EstablishmentList />}></Route>
      <Route path="/homepage" element={<HomePage />}></Route>
      <Route path="/food-by-establishment/:establishment_id" element={<FoodByEstablishment />}></Route>
      <Route path="/food-review/:food_id" element={<FoodReview />}></Route>
      <Route path="/establishment-review/:establishment_id" element={<EstablishmentReview />}></Route>
      <Route path="/create-establishment" element={<CreateEstablishment />}></Route>
      <Route path="/create-establishment-review/:establishment_id" element={<CreateEstablishmentReview />}></Route>
      <Route path="/search-establishment" element={<SearchEstablishment />}></Route>
      <Route path="/update-establishment" element={<UpdateEstablishment />}></Route>
      <Route path="/update-food" element={<UpdateFood/>}></Route>
    </Routes >
  )
}

export default Router;