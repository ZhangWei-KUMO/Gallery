import * as React from 'react';

const items = [
  { name: "ABOUT", link: "/#aboutme" },
  { name: "PICTURES", link: "/#pictures" },
  { name: "EXPERIENCE", link: "/#aboutme" },
]

class Header extends React.Component {
  public render() {
    return (
      <div className="js-header">
        <div className="container">
          <nav>
            <ul>
              {items.map(item => {
                return (
                  <a href={item.link} key={item.name}>
                    {item.name}
                  </a>
                )
              })}
            </ul>
          </nav>
          <div className="text">
            <div className="cell">
              <h1>Jiashun·Fang's
                <br></br> Gallery</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header