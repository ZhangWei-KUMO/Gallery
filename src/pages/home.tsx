import * as React from 'react';
import Header from '../components/Header';
import PictureList from '../components/PictureList';

class Home extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <PictureList />
      </div>
    )
  }
}

export default Home