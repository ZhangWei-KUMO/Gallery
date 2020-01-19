import * as React from 'react';
import { Link } from 'react-router-dom';
import "./index.less";


export default () => (
  <div className="cloud-error">
    <section>
      <h1 style={{ fontSize: "8rem" }}>404</h1>
      你要找的页面不存在<Link to="/">返回首页</Link>
    </section>
  </div>
)