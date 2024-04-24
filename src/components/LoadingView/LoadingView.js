import React from "react";
import './LoadingView.css';
import { ReactComponent as Icon } from '../../images/icon-project.svg';

function LoadingView(props) {
  return (
    <>
      <section className={`loading-view ${props.isLoading ? 'loading-view_active' : ''}`}>
        <Icon alt="иконка проекта" className="loading-view__image" />
        <h1 className="loading-view__title">Дневник настроения</h1>
      </section>
    </>
  )
}

export default LoadingView;