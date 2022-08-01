import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AllGalleries from './pages/AllGalleries';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { getActiveUser, logout } from './store/auth/slice';
import { selectIsAuthenticated } from './store/auth/selectors';
import MyGalleries from './pages/MyGalleries';
import CreateNewGallery from './pages/CreateNewGallery';
import ViewGalleryPage from './pages/ViewGalleryPage';
import AuthorGalleryPage from './pages/AuthorGalleriesPage';
import Navbar from './components/Navbar';
import NavbarComponent from './components/Navbar';

function App() {


  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <AllGalleries />
          </Route>
          <PrivateRoute exact path="/my-galleries">
            <MyGalleries />
          </PrivateRoute>
          <PrivateRoute exact path="/create">
            <CreateNewGallery />
          </PrivateRoute>
          <PrivateRoute path="/galleries/edit/:id">
            <CreateNewGallery />
          </PrivateRoute>
          <PublicRoute exact path="/galleries/:id">
            <ViewGalleryPage />
          </PublicRoute>
          <PrivateRoute exact path="/authors/:id">
            <AuthorGalleryPage />
          </PrivateRoute>
          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <Route exact path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;