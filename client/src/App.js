import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import UpdateProduct from './admin/UpdateProduct';
import Product from './core/Product';
import ManageProducts from './admin/ManageProducts';
import NotFound from './core/NotFound';
import Cart from './core/Cart';

const App= () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/cart' component={Cart} exact />
        <PrivateRoute path='/user/dashboard' component={Dashboard} exact />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} exact />
        <AdminRoute path='/create/category' component={AddCategory} exact />
        <AdminRoute path='/create/product' component={AddProduct} exact />
        <Route path='/product/:productId' component={Product} exact />
        <AdminRoute path='/admin/products' component={ManageProducts} exact />
        <AdminRoute
          path='/admin/product/update/:productId'
          component={UpdateProduct}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
