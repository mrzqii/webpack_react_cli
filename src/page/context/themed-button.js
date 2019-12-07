import React, { Component, useContext } from 'react'
import { ThemeContext } from './context.js'

// 1. 使用class的方式来实现
// class ThemedButton extends React.Component {
//   render() {
//     let props = this.props;
//     let theme = this.context;
//     return (
//       <button
//         {...props}
//         style={{backgroundColor: theme.background}}
//       />
//     );
//   }
// }
// ThemedButton.contextType = ThemeContext;

// 2. 使用hook的方式来实现
// function ThemedButton(props) {
//   const theme = useContext(ThemeContext);
//   return (
//     <button {...props} style={{ background: theme.background, color: theme.foreground }}>
//       I am styled by theme!
//     </button>
//   );
// }

// 3. 使用函数的方式
function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <button
            {...props}
            style={{ background: theme.background, color: theme.foreground }}
          >
            I am styled by theme!!!
          </button>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default ThemedButton
