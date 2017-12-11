import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

import style from './index.less';
import i18n from '../../../i18n.json';
import states from '../../control/states';


const randomIndex = Math.floor(Math.random() * 5);


const titleCenter = i18n.advertisements[randomIndex];

export default class Logo extends React.Component {
  constructor() {
    super();
    this.state = {
      style: style.r1,
      display: 'none',
    };
  }
  componentWillMount() {
    this.animate(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if ( // 只有在游戏进入开始, 或结束时 触发改变
      (
        [this.props.cur, nextProps.cur].indexOf(false) !== -1 &&
        (this.props.cur !== nextProps.cur)
      ) ||
      (this.props.reset !== nextProps.reset)
    ) {
      this.animate(nextProps);
    }
  }
  shouldComponentUpdate({ cur, reset }) {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }
  animate({ cur, reset }) {
    clearTimeout(Logo.timeout);
    this.setState({
      style: style.r1,
      display: 'none',
    });
    if (cur || reset) {
      this.setState({ display: 'none' });
      return;
    }

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      Logo.timeout = setTimeout(func, delay);
    };

    const show = (func) => { // 显示
      set(() => {
        this.setState({
          display: 'block',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => { // 隐藏
      set(() => {
        this.setState({
          display: 'none',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
      set(() => {
        this.setState({ style: style[m + 2] });
        set(() => {
          this.setState({ style: style[m + 1] });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func) => { // 开始跑步啦！
      set(() => {
        this.setState({ style: style[m + 4] });
        set(() => {
          this.setState({ style: style[m + 3] });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: style[m + 1] });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(() => {
        eyes(() => {
          eyes(() => {
            this.setState({ style: style[m + 2] });
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => { // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  }
  render() {
    if (this.props.cur) {
      return null;
    }
    if (states.youDead) {
      return (
        <div className={style.logo} style={{ display: this.state.display }}>
          <div className={cn({ bg: true, [style.dragon]: true, [this.state.style]: true })} />
          <p style={{ top: '90px', fontWeight: 'bold' }}>时间到，游戏结束</p>
        </div>
      );
    } else if (states.success && !states.notFirstSuccess) {
      return (
        <div className={style.logo} style={{ display: this.state.display }}>
          <div className={cn({ bg: true, [style.dragon]: true, [this.state.style]: true })} />
          <p style={{ top: '90px', fontWeight: 'bold' }}>游戏成功,可以领取奖品咯!</p>
          <p style={{ top: '150px', fontSize: '12px' }}>奖品先到先得，只能领取一次。非第一次完成游戏将不能领取奖品。</p>
          <p style={{ top: '180px', fontSize: '12px' }}>最终解释权归阿里国际UED所有</p>
        </div>
      );
    } else if (states.success && states.notFirstSuccess) {
      return (
        <div className={style.logo} style={{ display: this.state.display }}>
          <div className={cn({ bg: true, [style.dragon]: true, [this.state.style]: true })} />
          <p style={{ top: '90px', fontWeight: 'bold' }}>游戏成功,貌似你已经领取过奖品了哦!</p>
          <p style={{ top: '150px', fontSize: '12px' }}>奖品只能领取一次</p>
          <p style={{ top: '170px', fontSize: '12px' }}>最终解释权归阿里国际UED所有</p>
        </div>
      );
    }

    return (
      <div className={style.logo} style={{ display: this.state.display }}>
        <div className={cn({ bg: true, [style.dragon]: true, [this.state.style]: true })} />
        <p
          dangerouslySetInnerHTML={{ __html: titleCenter }}
        />
      </div>
    );
  }
}

Logo.propTypes = {
  cur: propTypes.bool,
  reset: propTypes.bool.isRequired,
};
Logo.statics = {
  timeout: null,
};
