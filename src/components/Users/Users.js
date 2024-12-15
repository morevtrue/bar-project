import React, { useState, useEffect, useCallback } from "react";
import './Users.css';
import { connect } from 'react-redux';
import actionCreatorUsers from "../../store/actionCreators/actionCreatorUsers";

function Users(props) {
    const {
        value_users,
    } = props;

    const handleOpenPopupDel = (id) => {
        props.onDelete(id);
    }

    return (
        <>
            <header className="users_header">
                <h1 className="users_title">Список пользователей</h1>
                <button onClick={props.onClickExit} className="button_exit">Выйти</button>
            </header>
            <main className="users">
                <table className="users_table">
                    <thead>
                        <tr className="users_table_header">
                            <td className="users_table_head">Имя пользователя</td>
                            <td className="users_table_head">Электронная почта</td>
                            <td className="users_table_head">Дата рождения</td>
                            <td className="users_table_head">Пол</td>
                            <td className="users_table_head">Телефон</td>
                            <td className="users_table_head">Телефон доверенного лица</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            value_users.map((item, idx) => (
                                <tr key={idx} className="users_table_items">
                                    <td className="users_table_item">{item.name ? item.name : ''}</td>
                                    <td className="users_table_item">{item.login ? item.login : ''}</td>
                                    <td className="users_table_item">{item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('ru') : ''}</td>
                                    <td className="users_table_item">{item.gender ? item.gender : ''}</td>
                                    <td className="users_table_item">{item.phone ? item.phone : ''}</td>
                                    <td className="users_table_item">{item.anotherPhone ? item.anotherPhone : ''}</td>
                                    <td className="users_table_item">
                                        <button className="user_delete_button" onClick={() => handleOpenPopupDel(item._id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}

const mapStateToProps = state => ({
    value_users: state.value_users,
  })

const mapDispatchToProps = dispatch => ({
    actionCreatorUsers: value => dispatch(actionCreatorUsers(value)),
  })
  
  export default (connect(
    mapStateToProps,
    mapDispatchToProps,
  ))(Users);