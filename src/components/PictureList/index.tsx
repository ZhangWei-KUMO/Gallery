
import * as React from 'react';
import * as a_pic from "./1.jpg";
import * as b_pic from "./2.jpg";
import * as c_pic from "./3.jpg";
import * as d_pic from "./4.jpg";
import Picture from '../Picture';
import "./index.less";


const items = [
  { name: "ALL", link: "/#aboutme" },
  { name: "文艺复兴风格", link: "/#pictures" },
  { name: "巴洛克风格", link: "/#aboutme" },
  { name: "洛可可风格", link: "/#aboutme" },
  { name: "新古典主义", link: "/#aboutme" },
  { name: "浪漫主义", link: "/#aboutme" },
  { name: "现实主义", link: "/#aboutme" },
  { name: "印象主义", link: "/#aboutme" },
]

const fakes = [
  { name: "1", link: a_pic.default },
  { name: "2", link: b_pic.default },
  { name: "3", link: c_pic.default },
  { name: "4", link: d_pic.default },
];


class PictureList extends React.Component {
  public render() {
    return (
      <section className="picture-list">
        <div className="container">
          <h1>Picture List</h1>
          <div className="picture-nav">
            <ul>
              {items.map(item => {
                return (
                  <a href={item.link} key={item.name}>
                    {item.name}
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="pictures">
            {fakes.map(item => (
              <Picture key={item.name} src={item.link}
              />
            ))}
          </div>
        </div>
      </section >
    )
  }
}

export default PictureList;