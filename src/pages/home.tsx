import * as React from 'react';
import CustomLayout from '../components/CustomLayout';
import Dashboard from '../components/Dashboard';
class Home extends React.Component {
  public render() {
    return (
      <div>
        <Dashboard />
      </div>
    )
  }
}

export default CustomLayout(Home, "home");