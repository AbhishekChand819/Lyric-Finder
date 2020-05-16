import React from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Index from './components/layout/Index'
import Lyrics from './components/tracks/Lyrics'
import Playlist from './components/playlist/Playlist'

import {Provider} from './context'
import {CollectionPro} from './collection'
import {TrendingPro} from './trending'

import './App.css';

function App() {
  return (
    <Provider>
      <CollectionPro>
      <TrendingPro> 
      <Router>
        <React.Fragment>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id/:name" component={Lyrics} />
              <Route exact path="/playlist/:id/:name" component={Playlist} />
            </Switch>
        </React.Fragment>
      </Router>
      </TrendingPro>
      </CollectionPro>
    </Provider>
  );
}

export default App;
