// 权限控制
import React from "react";
import { Route, Redirect } from "react-router-dom";

// 在使用这个组件的时候 如果传了authName参数 那么说明这个页面是需要有权限的人才能进入的不然就跳转到home页面
export default function({ component: Component, authName, ...rest }) {
  const isLogged = sessionStorage.getItem("myToken")
  const isAuth = false; // 是否有权限  这里只是简单写的 一般是通过运算permissionNamesHas(authName) 权限列表里面是否包含了这个权限 返回true或者false
  return (
    <Route
      {...rest}
      render={props => {

        // 取消权限
        return <Component {...props} />;



        if (isLogged) {
          if (authName) {
            if (isAuth) {
              return <Component {...props} />;
            } else {
              return <Redirect to="/noAuth" />;
            }
          } else {
            return <Component {...props} />;
          }
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}
