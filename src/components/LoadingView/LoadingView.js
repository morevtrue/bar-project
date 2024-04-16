import React from "react";
import './LoadingView.css';

function LoadingView () {
  return (
    <>
      <section className="loading-view">
        <img src="../../images/icon-project.svg" alt="иконка проекта" className="loading-view__image" />
        <h1 className="loading-view__title">Дневник настроения</h1>
      </section>
    </>
  )
}

export default LoadingView;