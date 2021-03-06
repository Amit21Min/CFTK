import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

const App = () => (
  // This to needs to removed, and we need to either create a Home Page or not have one
  <div className="container">
    <h1>
      Volunteer page - make sure to follow the steps when creating your extension to /volunteer
    </h1>
    <li>
        <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
        <Link to={ROUTES.VOLUNTEER_ASSIGNMENT}>Assignment</Link>
    </li>
    <li>
        <Link to={ROUTES.VOLUNTEER_SETTINGS}>Volunteer Settings</Link>
    </li>

  </div>
);
 
export default App;